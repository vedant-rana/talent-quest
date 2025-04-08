import axios from "axios";
import { API_URL } from "../config/envConstants";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
