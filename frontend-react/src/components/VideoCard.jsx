import { Link } from "react-router-dom";
import VideoThumbnail from "./VideoThumbnail";
import TimeAgo from "./timeAgo";

export default function VideoCard({ video }) {
  return (
    <div className="h-fit">
      <Link to={`/videos/${video.id}`}>
        <div
          key={video.id}
          className="m-2 flex flex-col items-start justify-between w-[300px] h-[250px] video-card"
        >
          <div className="w-full h-2/3 overflow-hidden">
            <VideoThumbnail videoUrl={video.url} />
          </div>
          <div className="p-2 h-1/3 w-full flex flex-col">
            <h2 className="font-bold">{video.title}</h2>
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
