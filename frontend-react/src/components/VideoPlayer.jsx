import React from "react";

export const VideoPlayer = ({ videoSrc }) => {
  return (
    <div className="w-full aspect-video">
      {videoSrc && (
        <video autoPlay controls width="100%" height="auto">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
