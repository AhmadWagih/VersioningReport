import axios from "axios";

const baseURL = "https://localhost:44396/api"; // 44396 - 7292
// read token from local storage
const tokenString = localStorage.getItem("token");
const userToken = JSON.parse(tokenString);
const  token = userToken?.token;
// set token in the header of all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const client = axios.create({ baseURL, setTimeout: 20000 });

export default client;
