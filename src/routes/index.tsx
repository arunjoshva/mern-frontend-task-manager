import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },    
    {
        path: "/dashboard",
        element: ( <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
        )
    }
]);

export default router;