import React, { useRef, useState } from "react";
import axios from "axios";
import { VideoPlayer } from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
const VideoUploader = ({
  onUploadComplete,
  uploading,
  setUploading,
  filePreview,
  setFilePreview,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const navigate = useNavigate();

  const processFile = async (file) => {
    const isValid = /\.(mp4)$/i.test(file.name);
    if (isValid) {
      setErrorMessage(null);
      const success = await uploadFile(file); // Start uploading the file
      if (success) setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
      setErrorMessage("Please select a valid video file (mp4).");
    }
  };

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const videoUrl = response.data.url;
      setUploadedVideoUrl(videoUrl);
      setFilePreview(videoUrl); // Show the uploaded video
      onUploadComplete(videoUrl); // Pass the URL back to the parent component
      setUploading(false);
      return true;
    } catch (error) {
      setErrorMessage("Failed to upload video. Please try again.");
      return false;
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <>
      {!filePreview && (
        <div className="bg-slate-900 absolute w-full h-full top-0 left-0 opacity-50" />
      )}
      <div
        className={`w-[900px]  mx-auto ${
          !filePreview &&
          "h-[600px] absolute z-10 top-10 left-[50%] translate-x-[-50%]"
        }`}
      >
        <label
          htmlFor="file-upload"
          id="file-drag"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`group flex flex-col justify-center items-center w-full h-full text-center  hover:border-0 rounded-lg ${
            !filePreview
              ? "border-2 border-gray-300 bg-slate-50 hover:bg-slate-200"
              : ""
          } transition-all duration-200 cursor-pointer select-none`}
        >
          {filePreview ? (
            <VideoPlayer videoSrc={uploadedVideoUrl || filePreview} />
          ) : (
            <div id="start" className="flex flex-col items-center">
              <i
                id="upload-icon"
                className="fa fa-download text-5xl mb-4 group-hover:text-7xl group-hover:text-slate-600 "
                aria-hidden="true"
              ></i>
              <p className="text-blue-300 text-sm group-hover:hidden">
                ~ 200MB max
              </p>
              <div className="text-gray-600 group-hover:hidden">
                Select a file or drag here
              </div>
              {errorMessage && (
                <div className="text-red-500 font-bold mt-2">
                  {errorMessage}
                </div>
              )}
            </div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        {!filePreview && (
          <a
            onClick={() => navigate("/")}
            className="relative top-3 text-xl cursor-pointer"
          >
            Cancel
          </a>
        )}
      </div>
    </>
  );
};

export default VideoUploader;
