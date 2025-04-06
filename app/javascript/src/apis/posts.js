import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => {
  axios.post("/posts", { post: payload });
};

const edit = (slug, payload) => axios.put(`/posts/${slug}`, { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const postsAPI = { fetch, create, show, edit };

export default postsAPI;
