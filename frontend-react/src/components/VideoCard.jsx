import { Link } from "react-router-dom";
import VideoThumbnail from "./VideoThumbnail";
import TimeAgo from "./timeAgo";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

// icons
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function VideoCard({ video, col }) {
  const { user } = useContext(AppContext);

  return (
    <div
      className={`max-h-min ${
        col ? "w-full" : "w-[50%] md:w-[33%] xl:w-[25%] 2xl:w-[20%]  "
      }`}
    >
      <Link to={`/videos/${video.id}`}>
        <div
          key={video.id}
          className="m-2 flex flex-col items-start justify-between  video-card"
        >
          <div className="w-full aspect-video  overflow-hidden">
            <VideoThumbnail videoUrl={video.url} />
            <div className="h-full animate-pulse z-[-3] bg-slate-700 " />
          </div>
          <div className="p-2 h-1/3 w-full flex flex-col">
            <div className="flex justify-between">
              <h2 className="font-bold">{video.title}</h2>
              {user?.id == video.user_id && (
                <HiOutlineDotsVertical className="text-[20px]" />
              )}
            </div>
            <div className="flex items-end w-full justify-between">
              <small className="font-semibold">{video.user.name}</small>
              <TimeAgo createdAt={video.created_at} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
