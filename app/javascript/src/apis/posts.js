import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => {
  axios.post("/posts", { post: payload });
};

const edit = (slug, payload) => axios.put(`/posts/${slug}`, { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const deletePost = slug => axios.delete(`/posts/${slug}`);

const publishOrDraft = slug => axios.patch(`/posts/${slug}`);

const myPosts = () => axios.get("/posts/my_posts");

const postsAPI = {
  fetch,
  create,
  show,
  edit,
  deletePost,
  publishOrDraft,
  myPosts,
};

export default postsAPI;
