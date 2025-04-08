import React, { useEffect } from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

const ProgressBar = ({ progress, isDownload, setIsDownload }) => {
  useEffect(() => {
    if (progress === 100 && isDownload) {
      const timeout = setTimeout(() => {
        setIsDownload(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [progress, isDownload, setIsDownload]);

  return (
    <>
      {isDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="text-2xs relative flex h-5 animate-pulse items-center justify-center rounded-full bg-indigo-300 font-medium leading-none"
              initial={{ width: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span
                className={classNames("flex items-center justify-center", {
                  "absolute left-1": progress <= 8,
                })}
              >
                {progress}%
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
