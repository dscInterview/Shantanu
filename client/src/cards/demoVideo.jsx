import React, { useState, useEffect } from "react";
import axios from "axios";

const DemoVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/demo")
      .then((response) => setVideoUrl(response.data.videoUrl))
      .catch((error) => console.error(error));
  }, []);
  return <div></div>;
};

export default DemoVideo;
