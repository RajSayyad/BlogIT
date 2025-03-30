import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => {
  axios.post("/posts", { post: payload });
};

const postsAPI = { fetch, create };

export default postsAPI;
