import axios from "axios";

const fetch = () => axios.get("/posts");

const postsAPI = { fetch };

export default postsAPI;
