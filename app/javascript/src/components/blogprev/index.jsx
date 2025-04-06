import React, { useState } from "react";

import { ArrowUpFromLine, ArrowDownFromLine } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import postsAPI from "../../apis/posts";
import { DateView, CategoryView, HeadingView } from "../commons";

const BlogPrev = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [upVote, setUpVote] = useState(
    post.user_vote === "upvote"
      ? true
      : post.user_vote === "downvote"
      ? false
      : null
  );

  const netVotes = upvotes - downvotes;

  const handleVote = async (e, type) => {
    e.preventDefault();

    // prevent voting again
    if (
      (type === "up" && upVote === true) ||
      (type === "down" && upVote === false)
    ) {
      toast.info("You already voted.");

      return;
    }

    try {
      if (type === "up") {
        const response = await postsAPI.upVote(post.slug);
        toast.success(response.data.message);
        setUpvotes(response.data.upvotes);
        setDownvotes(response.data.downvotes);
        setUpVote(true);
      } else if (type === "down") {
        const response = await postsAPI.downVote(post.slug);
        toast.success(response.data.message);
        setUpvotes(response.data.upvotes);
        setDownvotes(response.data.downvotes);
        setUpVote(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error voting");
    }
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex w-full">
        {/* Post Content */}
        <Link className="flex-1" key={post.id} to={`/post/${post.slug}`}>
          <HeadingView heading={post.title} />
          <CategoryView post={post} />
          <div className="ml-1 mt-4">
            <p className="text-sm text-gray-600">{post.user.name}</p>
            <div className="m-1 flex w-auto">
              <div
                className={`align-items-center rounded-xl border border-red-400 bg-red-200 ${
                  post.is_bloggable ? "hidden" : ""
                }`}
              >
                <p className="px-4 text-xs">Draft</p>
              </div>
            </div>
            <DateView dateStr={post.updated_at} />
          </div>
        </Link>
        {/* Vote Panel */}
        <div className="flex items-center justify-center px-24">
          <div className="text-center text-gray-600">
            <ArrowUpFromLine
              size={36}
              className={`${
                upVote ? "text-green-600" : "text-gray-700"
              } font-extrabold`}
              onClick={e => handleVote(e, "up")}
            />
            <p className="text-2xl">{netVotes}</p>
            <ArrowDownFromLine
              size={36}
              className={`${
                upVote === false ? "text-red-600" : "text-gray-700"
              } font-extrabold`}
              onClick={e => handleVote(e, "down")}
            />
          </div>
        </div>
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default BlogPrev;
