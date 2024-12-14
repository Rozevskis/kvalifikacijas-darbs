import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VideoPlayer } from "../../components/VideoPlayer";
import VideoList from "../../components/Blocks/VideoList";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

// icons
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Show() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
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

  const [options, setOptions] = useState(false);
  function handleOptions() {
    if (!options) {
      setOptions(true);
    } else {
      setOptions(false);
    }
  }
  async function handleDelete(id) {
    const res = await fetch(`/api/videos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      navigate("/");
    }
  }

  return (
    <div>
      {video ? (
        <div className="flex flex-row">
          <div className="w-3/5 mx-auto m-4">
            <div className="flex flex-col gap-4">
              <div className="w-full h-2/3 overflow-hidden">
                <VideoPlayer videoSrc={video.url} />
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{video.title}</p>{" "}
                  {user?.id == video.user_id && (
                    <div
                      className="px-2 py-1"
                      onClick={() => handleOptions(id)}
                    >
                      <HiOutlineDotsVertical className="text-[24px] cursor-pointer" />
                      <div
                        className={` ${
                          !options ? "hidden" : ""
                        } mt-[0px] ml-[-50px] absolute p-3 gap-3 bg-slate-50 text-black rounded-xl text-left flex flex-col shadow-md `}
                      >
                        <a
                          className=" cursor-pointer"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </a>
                        <a className=" cursor-pointer">Edit</a>
                        {/* <a >History</a> */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-slate-300 text-black dark:bg-neutral-800 dark:text-neutral-100">
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
          <div className="w-1/5 items-end">
            <VideoList currentVideoUrl={video.url} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
