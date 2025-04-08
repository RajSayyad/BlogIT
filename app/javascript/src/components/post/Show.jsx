import React, { useEffect, useState } from "react";

import createConsumer from "channels/consumer";
import { subscribeToPostDownloadChannel } from "channels/postDownloadChannel";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { Pencil, Download } from "lucide-react";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";

import postsAPI from "../../apis/posts";
import { HeadingView, DateView, CategoryView, ProgressBar } from "../commons";

const Show = () => {
  const consumer = createConsumer();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const history = useHistory();
  const generatePdf = async () => {
    try {
      await postsAPI.generate(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsAPI.download(slug);
      FileSaver.saveAs(data, `${post.title}.pdf`);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    if (!isDownload) return () => {}; // return a no-op cleanup

    const unsubscribe = subscribeToPostDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
      downloadPdf,
    });

    return () => {
      unsubscribe();
    };
  }, [isDownload]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.show(slug);
      setPost(response.data);
    } catch (error) {
      Logger.error(`Error: ${error}`);
      history.push("/");
    }
  };

  const handleDownload = e => {
    e.preventDefault();
    setIsDownload(true);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <div className="m-5">
        <CategoryView post={post} />
        <div className="mb-5 mt-5">
          <div className="flex">
            <div>
              <HeadingView heading={post.title} />
              <div className="m-1 mb-1 flex w-auto">
                <div
                  className={`align-items-center rounded-xl border border-red-400 bg-red-200 ${
                    post.is_bloggable ? "hidden" : " "
                  }`}
                >
                  <p className="px-4 text-xs">Draft</p>
                </div>
              </div>
            </div>
            <div className="group fixed right-36">
              <button className="hover:underline" onClick={handleDownload}>
                <Download />
              </button>
              <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                Download
              </div>
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
            <DateView dateStr={post.updated_at} />
          </div>
        </div>
        <div className="m-1">
          <p className="mb-8">{post.description}</p>
        </div>
      </div>
      <ProgressBar
        isDownload={isDownload}
        message={message}
        progress={progress}
        setIsDownload={setIsDownload}
      />
    </>
  );
};

export default Show;
