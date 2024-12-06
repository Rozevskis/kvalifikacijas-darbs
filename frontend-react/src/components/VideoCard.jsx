import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <a href="">
      <div
        key={video.id}
        className="m-2 flex flex-col items-start justify-between w-[300px] h-[250px]"
      >
        <div className="w-full h-2/3 overflow-hidden">
          <img src="https://picsum.photos/300/200" alt={video.title} />
        </div>
        <div className="p-2 h-1/3 w-full flex flex-col">
          <h2 className="font-bold">{video.title}</h2>
          <small>{video.url}</small>
          <div className="flex justify-end w-full gap-3">
            <small className="font-semibold">{video.user.name}</small>
            <small>{new Date(video.created_at).toLocaleString()}</small>
          </div>
          <Link to={`/videos/${video.id}`}>Watch</Link>
        </div>
      </div>
    </a>
  );
}
