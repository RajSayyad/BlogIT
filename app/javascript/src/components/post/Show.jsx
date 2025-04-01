import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import postsAPI from "../../apis/posts";
import { HeadingView, DateView, CategoryView } from "../commons";

const Show = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const history = useHistory();
  const fetchPost = async () => {
    try {
      const response = await postsAPI.show(slug);
      setPost(response.data);
    } catch (error) {
      Logger.error(`Error: ${error}`);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="m-5">
      <CategoryView post={post} />
      <div className="mb-5 mt-5">
        <HeadingView heading={post.title} />
        <div className="m-5 ml-20">
          <p className="text-md">{post.user.name}</p>
          <DateView dateStr={post.created_at} />
        </div>
      </div>
      <div className="m-1">
        <p className="mb-8">{post.description}</p>
      </div>
    </div>
  );
};

export default Show;
