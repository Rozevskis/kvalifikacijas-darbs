import { Link } from "react-router-dom";
import VideoThumbnail from "./VideoThumbnail";
import TimeAgo from "./timeAgo";

export default function VideoCard({ video }) {
  return (
    <div className="max-h-min w-[25%] min-w-[300px]">
      <Link to={`/videos/${video.id}`}>
        <div
          key={video.id}
          className="m-2 flex flex-col items-start justify-between  video-card"
        >
          <div className="w-full h-full overflow-hidden">
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
