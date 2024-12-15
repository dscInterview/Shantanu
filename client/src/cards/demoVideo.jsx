import React, { useState, useEffect } from "react";
import axios from "axios";

const DemoVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/demo")
      .then((response) => setVideoUrl(response.data.videoUrl))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {videoUrl ? (
        <iframe
          width="600"
          height="400"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default DemoVideo;
