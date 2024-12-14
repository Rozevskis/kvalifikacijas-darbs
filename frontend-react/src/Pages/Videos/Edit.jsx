import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { VideoPlayer } from "../../components/VideoPlayer";

import SideNav from "../../components/SideNav";

export default function Edit() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  });

  async function getVideo() {
    const res = await fetch(`/api/videos/${id}`);
    const data = await res.json();
    setVideo(data);
    if (res.ok) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
      });
    }
  }
  useEffect(() => {
    getVideo();
  }, []);

  const [errors, setErrors] = useState({});

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/videos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className="w-[1200px] mt-5 mx-auto flex flex-row items-start h-[900px]">
        <div className="w-[900px]">
          <div className="w-fit ">{/* VIDEO */}</div>

          <VideoPlayer videoSrc={video?.url} />
          <form onSubmit={handleUpdate} className="">
            <div>
              <input
                type="text"
                placeholder="Video title"
                value={formData.title}
                className="mt-6 w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div>
              <textarea
                rows="10"
                style={{ resize: "none" }}
                className="mt-2 w-full p-2 rounded text-black bg-slate-200 dark:text-slate-100 dark:bg-slate-700"
                placeholder="Description "
                value={formData?.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <button className="primary-btn w-56 mt-5">Update</button>
          </form>
        </div>
        <VideoDetails />
      </div>
    </>
  );
}

function VideoDetails({}) {
  return (
    <>
      <div className="h-full w-[300px] bg-slate-900 dark:bg-neutral-900  px-8 py-4 flex flex-col shadow-lg">
        Video details
        <hr />
      </div>
    </>
  );
}
