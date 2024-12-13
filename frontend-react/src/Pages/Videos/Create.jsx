import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import VideoUploader from "../../components/VideoUploader";

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [uploading, setUploading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch("/api/videos", {
      method: "POST",
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
  const handleVideoUploadComplete = (videoUrl) => {
    setFormData({ ...formData, url: videoUrl });
  };

  return (
    <>
      <h1 className="title">Upload a new video</h1>
      <div className="">
        <VideoUploader
          onUploadComplete={handleVideoUploadComplete}
          uploading={uploading}
          setUploading={setUploading}
        />
      </div>
      {!uploading && (
        <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
          <div>
            <input
              type="text"
              placeholder="Video title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <button className="primary-btn">Post</button>
        </form>
      )}
    </>
  );
}
