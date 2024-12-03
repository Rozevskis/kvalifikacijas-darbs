import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Show() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  // console.log(useParams());
  async function getVideo() {
    const res = await fetch(`/api/videos/${id}`);
    const data = await res.json();
    setVideo(data);
    if (res.ok) {
      console.log(data);
    }
  }
  useEffect(() => {
    getVideo();
  }, []);
  return (
    <div>
      {video ? (
        <div className="w-4/5 mx-auto m-4">
          <div className="flex flex-col gap-4">
            <div className="w-full h-2/3 overflow-hidden">
              <img src="https://picsum.photos/1600/900" />
            </div>
            <div className="flex flex-col gap-2 m-4">
              <p className="text-xl font-bold">{video.title}</p>
              <div className="p-4 rounded-xl bg-slate-300">
                <p>{video.description}</p>
                <small>{video.url}</small>
                <div className="flex justify-end w-full gap-3">
                  <small className="font-semibold">{video.user.name}</small>
                  <small>{new Date(video.created_at).toLocaleString()}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
