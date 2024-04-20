import axios from "axios";
const urlBackEnd =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://localhost:5211";
export const instance = axios.create({
  baseURL: urlBackEnd,
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    Authorization: JSON.parse(localStorage.getItem("accessToken")) || null,
  },
});
