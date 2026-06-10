import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { createTask, deleteTask, getTasks, toggleTaskStatus, updateTask } from "../services/taskService";
import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
        
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("user");

        navigate("/login");
    };

    const fetchTasks = async () => {
        try {
            const data = await getTasks();

            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (title: string, description: string) => {
        try {

            setSuccess("");
            setError("");

            await createTask(title, description);

            await fetchTasks();

            setSuccess("Task Added");            

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error(error);

            setError("Failed to Add Task");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const handledUpdateTask = async (id: string, title: string, description: string) => {
        try {
            await updateTask(id, title, description);

            setEditingTask(null);

            await fetchTasks();

            setSuccess("Task Updated");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error(error);

            setError("Failed to Update Task");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);

            await fetchTasks();

            setSuccess("Task Deleted");

            setTimeout(() => {
                setSuccess("");
            }, 3000);

        } catch (error) {
            console.error(error);

            setError("Failed to Delete Task");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const handleToggle = async (id: string) => {
        try {
            await toggleTaskStatus(id);

            await fetchTasks();

            setSuccess("Task Status Updated");

            setTimeout(() => {
                setSuccess("");
            }, 3000);


        } catch (error) {
            console.error(error);

            setError("Failed to Update Status");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === "all" ? true : task.status === filter;

        return (matchesSearch && matchesFilter);
    });

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

                        <p className="text-gray-500">Task Management Board</p>
                    </div>

                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer">Logout</button>

                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">     

                <div className="bg-white p-4 rounded-xl shadow mb-4">

                    <div className="flex flex-col md:flex-row gap-4">

                        <input type="text" placeholder="Search Tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />

                        <select value={filter} onChange={e => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2">
                                <option value="all">All Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                    </div>

                </div>           

                <TaskForm onAddTask={handleAddTask} success={success} error={error} onUpdateTask={handledUpdateTask} editingTask={editingTask} />

                <div className="mt-6 grid gap-4">
                    {
                        filteredTasks.length === 0 ? (<p>No tasks found.</p>) : (
                            filteredTasks.map((task) => (
                                <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
                            ))
                        )
                    }
                </div>
            </main>
        
        </div>
    );
};

export default Dashboard;
