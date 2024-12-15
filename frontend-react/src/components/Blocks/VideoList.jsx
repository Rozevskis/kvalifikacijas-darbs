import { useEffect, useState } from "react";
import VideoCard from "../VideoCard";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const VideoList = ({ currentVideoUrl, col }) => {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(AppContext);
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
          if (video.isPrivate && video.user_id !== user?.id) {
            return null; // Skip rendering the video if it's private and not the current user's video
          }
          // Check if video.url is not equal to currentVideoUrl
          if (video.url !== currentVideoUrl) {
            return (
              <VideoCard key={video.id} video={video} col={currentVideoUrl} />
            );
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
