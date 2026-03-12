import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5231/api",
  withCredentials: true,
});
