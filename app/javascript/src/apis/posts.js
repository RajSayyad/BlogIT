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

const upVote = slug => axios.put(`/posts/${slug}/upvote`);

const downVote = slug => axios.put(`/posts/${slug}/downvote`);

const generate = slug => axios.post(`/posts/${slug}/postpdf`);

const download = (slug, config) =>
  axios.get(`/posts/${slug}/postpdf/download`, config);

const postsAPI = {
  fetch,
  create,
  show,
  edit,
  deletePost,
  publishOrDraft,
  myPosts,
  upVote,
  downVote,
  generate,
  download,
};

export default postsAPI;
