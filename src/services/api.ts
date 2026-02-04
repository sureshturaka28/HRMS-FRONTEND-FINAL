import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-backend-final-9soe.onrender.com",
});

export default api;
