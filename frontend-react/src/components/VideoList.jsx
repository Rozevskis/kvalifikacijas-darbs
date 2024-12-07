import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

const VideoList = () => {
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
    <div className="flex flex-row m-6 flex-wrap">
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video.id} video={video} />) // Use the VideoCard component for each video
      ) : (
        <p>No Videos found</p>
      )}
    </div>
  );
};

export default VideoList;
