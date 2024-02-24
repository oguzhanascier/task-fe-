import axios from "axios";
const  appAxios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

interface User {
  accessToken: string;
}

const user: User = JSON.parse(localStorage.getItem("user") || "{}");

if (user && user.accessToken) {
  appAxios.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`;
}

export default appAxios;
