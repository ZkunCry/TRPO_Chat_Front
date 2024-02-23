import axios from "axios";
export const instance = axios.create({
  baseURL: "http://localhost:5211",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    Authorization: JSON.parse(localStorage.getItem("accessToken")),
  },
});
