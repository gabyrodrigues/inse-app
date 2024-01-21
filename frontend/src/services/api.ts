import axios from "axios";

const isDev = import.meta.env.VITE_NODE_ENV === "development";

export const api = axios.create({
  baseURL: isDev ? "http://localhost:3333" : "https://inse-app-api.onrender.com"
});
