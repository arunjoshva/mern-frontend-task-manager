import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-backend-taskmanager.onrender.com/api"
});

api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");

        if(user){
            const parsedUser = JSON.parse(user);

            config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

export default api;