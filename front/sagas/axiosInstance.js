// lib/axiosInstance.js
import axios from "axios";
import { backUrl } from "../config/config";

const axiosInstance = axios.create({
  baseURL: backUrl,
  withCredentials: true,
});

console.log('backUrl>>>>>>>>',backUrl)

export default axiosInstance;
