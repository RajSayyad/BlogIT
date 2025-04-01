import React from "react";

const DateView = ({ dateStr }) => {
  const date = new Date(dateStr);
  const extractedDate = date.toISOString().split("T")[0];

  return <p className="mt-1 text-sm text-gray-400">{extractedDate}</p>;
};

export default DateView;
