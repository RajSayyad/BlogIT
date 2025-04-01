import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => {
  axios.post("/posts", { post: payload });
};

const show = slug => axios.get(`/posts/${slug}`);

const postsAPI = { fetch, create, show };

export default postsAPI;
