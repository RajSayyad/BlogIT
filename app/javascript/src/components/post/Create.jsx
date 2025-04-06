import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import categoryApi from "../../apis/categories";
import postsAPI from "../../apis/posts";
import { getFromLocalStorage } from "../../utils/storage";
import { HeadingView, Form, SaveAndPublish } from "../commons";

const Create = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [postCategories, setPostCategories] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await categoryApi.fetchCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        Logger.log(error);
        history.push("/");
      }
    };
    fetchCat();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsAPI.create({
        title: postTitle,
        description: postDescription,
        user_id: getFromLocalStorage("authUserId"),
        organization_id: getFromLocalStorage("authUserOrgId"),
        category_ids: postCategories,
      });

      toast.success("New Post Created");
      setPostTitle("");
      setPostDescription("");
      history.push("/dashboard");
    } catch (error) {
      toast.error("Error");
      Logger.error("Error creating post:", error);
    }
  };

  if (loading) return <HeadingView heading="Loading" />;

  return (
    <>
      <div className="flex h-10">
        <div>
          <HeadingView heading="New Blog Post" />
        </div>
        <div className="fixed right-12">
          <SaveAndPublish handleClick={handleSubmit} />
        </div>
      </div>
      <Form
        categories={categories}
        handleSubmit={handleSubmit}
        postDescription={postDescription}
        postTitle={postTitle}
        setPostCategories={setPostCategories}
        setPostDescription={setPostDescription}
        setPostTitle={setPostTitle}
      />
    </>
  );
};

export default Create;
