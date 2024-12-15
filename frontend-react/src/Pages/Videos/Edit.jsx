import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { VideoPlayer } from "../../components/VideoPlayer";

import SideNav from "../../components/SideNav";

// icons
import { FaGlobe } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";

export default function Edit() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    isPrivate: false,
  });

  async function getVideo() {
    const res = await fetch(`/api/videos/${id}`);
    const data = await res.json();
    setVideo(data);
    if (res.ok) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        isPrivate: data.isPrivate || false,
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
      <form onSubmit={handleUpdate} className="">
        <div className="w-[1200px] mt-5 mx-auto flex flex-row items-start h-[900px]">
          <div className="w-[900px]">
            <div className="w-fit ">{/* VIDEO */}</div>

            <VideoPlayer videoSrc={video?.url} />
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
          </div>
          <VideoDetails
            isPrivate={formData.isPrivate}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </form>
    </>
  );
}

function VideoDetails({ isPrivate, formData, setFormData }) {
  return (
    <>
      <div className="h-full w-[300px] bg-slate-900 dark:bg-neutral-900  px-8 py-4 flex flex-col shadow-lg">
        Video details
        <hr />
        <div className="mt-4">
          <p>Video Privacy</p>
          <label className=" text-slate-100 space-x-2 flex items-center">
            <FaGlobe />
            <input
              type="radio"
              name="privacy"
              value="false"
              checked={!formData.isPrivate}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isPrivate: false }))
              }
            />
            <p>Public</p>
          </label>
          <label className=" mt-2 text-slate-100 space-x-2 flex items-center">
            <GoPersonFill />
            <input
              type="radio"
              name="privacy"
              value="true"
              checked={formData.isPrivate}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isPrivate: true }))
              }
            />
            <p>Private</p>
          </label>
        </div>
      </div>
    </>
  );
}
