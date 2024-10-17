import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

const http = {
  get: app.get,
  patch: app.patch,
  put: app.put,
  post: app.post,
  delete: app.delete,
};

export default http;
