import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

import categoryApi from "../../apis/categories";
import postsAPI from "../../apis/posts";
import { HeadingView, Form, SaveAndPublish, ThreeDotMenu } from "../commons";

const Edit = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesDefault, setCategoriesDefault] = useState([]);
  const [postCategories, setPostCategories] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [userID, setUserID] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPost = async () => {
    try {
      const response = await postsAPI.show(slug);
      setPostTitle(response.data.title);
      setPostDescription(response.data.description);
      setCategoriesDefault(response.data.categories);
      setUserID(response.data.user_id);
      setOrganizationId(response.data.organization_id);
    } catch (error) {
      Logger.error(`Error: ${error}`);
      history.push("/");
    }
  };

  const fetchCat = async () => {
    try {
      const response = await categoryApi.fetchCategories();
      setCategories(response.data);
    } catch (error) {
      Logger.log(error);
      history.push("/");
    }
  };

  const handlePublish = async event => {
    event.preventDefault();

    try {
      const response = await postsAPI.edit(slug, {
        title: postTitle,
        description: postDescription,
        user_id: userID,
        organization_id: organizationId,
        category_ids: postCategories,
        is_bloggable: true,
      });
      toast.success(response.data.message);
      setPostTitle("");
      setPostDescription("");
      history.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
      Logger.error("Error creating post:", error);
    }
  };

  const handleDraft = async () => {
    try {
      const response = await postsAPI.publishOrDraft(slug);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error[0]);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await postsAPI.deletePost(slug);
      toast.success(response.data.message);
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchPost(), fetchCat()]);
      } catch (error) {
        Logger.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <h1>Loading..</h1>;
  }

  return (
    <div>
      <div className="flex h-10">
        <div>
          <HeadingView heading="Edit blog post" />
        </div>
        <div className="fixed right-24">
          <SaveAndPublish
            handleDraft={handleDraft}
            handlePublish={handlePublish}
          />
        </div>
        <div className="fixed right-12">
          <ThreeDotMenu handleDelete={handleDelete} />
        </div>
      </div>
      <Form
        categories={categories}
        categoriesDefault={categoriesDefault}
        loading={loading}
        postDescription={postDescription}
        postTitle={postTitle}
        setPostCategories={setPostCategories}
        setPostDescription={setPostDescription}
        setPostTitle={setPostTitle}
      />
    </div>
  );
};

export default Edit;
