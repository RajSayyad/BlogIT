import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { Pencil } from "lucide-react";
import {
  useHistory,
  useParams,
  Link,
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
        <div className="flex">
          <div>
            <HeadingView heading={post.title} />
          </div>
          <div className="group fixed right-28">
            <Link className="hover:underline" to={`/post/${slug}/edit`}>
              <Pencil />
            </Link>
            <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
              Edit
            </div>
          </div>
        </div>
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
