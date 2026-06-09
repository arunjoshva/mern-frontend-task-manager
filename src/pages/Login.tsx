import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

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

            const data = await loginUser(email, password);

            localStorage.setItem("user", JSON.stringify(data));

            setSuccess("Login Successful. Redirecting...");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Invalid Email or Password");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

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

                    <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} 
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white
                        py-2 rounded-lg transition duration-300 disabled:bg-blue-400 cursor-pointer" >
                        
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
                    </div>

                </form>

            </div>
        
        </div>
    );
};

export default Login;
