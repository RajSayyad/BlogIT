import axios from "axios";

const login = payload => axios.post("/sessions", { login: payload });
const logout = () => axios.destroy("/sessions");

const signup = payload => axios.post("/users", { user: payload });

const authApi = { signup, login, logout };

export default authApi;
