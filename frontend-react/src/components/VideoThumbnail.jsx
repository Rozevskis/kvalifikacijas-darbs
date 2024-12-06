import React, { useState, useEffect, useRef } from "react";
import { VideoPlayer } from "./VideoPlayer";

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoUrl) {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext("2d");

      videoElement.onloadeddata = () => {
        // Ensure video is loaded before extracting the thumbnail
        videoElement.currentTime = videoElement.duration / 2; // Grab thumbnail from the middle of the video
      };

      videoElement.onseeked = () => {
        // Once the frame is loaded, draw the current frame to the canvas
        context.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        // Get the data URL from the canvas and set it as the thumbnail
        const imageUrl = canvasElement.toDataURL();
        setThumbnail(imageUrl);
      };
    }
  }, [videoUrl]);

  return (
    <div className="thumbnail">
      <div className="video-compact-container hidden">
        <VideoPlayer videoSrc={videoUrl} />
      </div>
      <video ref={videoRef} src={videoUrl} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width="320"
        height="180"
        style={{ display: "none" }}
      />
      {thumbnail && <img src={thumbnail} alt="Video Thumbnail" />}
    </div>
  );
};
export default VideoThumbnail;
