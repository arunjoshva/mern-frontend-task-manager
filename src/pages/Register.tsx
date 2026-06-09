import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        try {
            setLoading(true);

            const data = await registerUser(name, email, password);

            console.log(data);

            setName("");
            setEmail("");
            setPassword("");

            setSuccess("Registration successful");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err: any) {
            setError( err?.response?.data?.message || "Registration Failed" );
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

                {success && (
                    <div className="mb-4 rounded-md bg-green-100 border border-green-300 text-green-700 px-4 py-3">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required
                    />

                    <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} 
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>

                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} 
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus: outline-none focus:ring-2 focus:ring-blue-500" required/>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition cursor-pointer">
                        {loading ? "Registering..." : "Register" }
                    </button>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Register;
