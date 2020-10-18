import React, { useEffect } from "react";
import useStorage from "./useStorage";

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div
      className="progressBar"
      style={{ width: progress + "%", color: "black" }}
    ></div>
  );
};

export default ProgressBar;
