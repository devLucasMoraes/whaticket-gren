import axios from "axios";
import { errorInterceptor } from "./interceptors/errorInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { api };
