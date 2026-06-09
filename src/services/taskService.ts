import api from "../api/axios";

export const createTask = async (title: string, description: string) => {
    const response = await api.post("/tasks", { title, description });
    return response.data;
}

export const getTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
}

export const updateTask = async (id: string, title: string, description: string) => {
    const response = await api.put(`/tasks/${id}`, {title, description});
    return response.data;
}

export const deleteTask = async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data
}

export const toggleTaskStatus = async (id: string) => {
    const response = await api.patch(`/tasks/${id}/status`);
    return response.data;
}

