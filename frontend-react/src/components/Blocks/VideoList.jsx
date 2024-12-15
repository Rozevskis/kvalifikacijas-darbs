import { useEffect, useState } from "react";
import VideoCard from "../VideoCard";

const VideoList = ({ currentVideoUrl, col }) => {
  const [videos, setVideos] = useState([]);

  async function getVideos() {
    const res = await fetch("/api/videos");
    const data = await res.json();
    if (res.ok) {
      setVideos(data);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div
      className={`flex ${
        currentVideoUrl && "flex-col"
      } w-full m-6 flex-wrap content-start shadow-inner`}
    >
      {videos.length > 0 ? (
        videos.map((video) => {
          // Check if video.url is not equal to currentVideoUrl
          if (video.url !== currentVideoUrl) {
            return <VideoCard key={video.id} video={video} />;
          }
          return null; // Skip rendering the VideoCard if urls are the same
        })
      ) : (
        <p>No Videos found</p>
      )}
    </div>
  );
};

export default VideoList;
