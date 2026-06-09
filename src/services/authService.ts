import api from "../api/axios"

export const registerUser = async (name: string, email: string, password: string) => {
    const repsonse = await api.post("/auth/register", { name, email, password });

    return repsonse.data;
}

export const loginUser = async (email: string, password: string ) => {
    const response = await api.post("/auth/login", { email, password });

    return response.data;
}