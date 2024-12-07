import React, { useRef, useState } from "react";
import axios from "axios";
import { VideoPlayer } from "./VideoPlayer";
import "./VideoUploader.css";

const VideoUploader = ({ onUploadComplete }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const isValid = /\.(mp4|avi|mkv)$/i.test(file.name);
    if (isValid) {
      setFilePreview(URL.createObjectURL(file));
      setErrorMessage(null);
      uploadFile(file); // Start uploading the file
    } else {
      setFilePreview(null);
      setErrorMessage("Please select a valid video file (mp4, avi, mkv).");
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
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
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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
    <div className="uploader">
      <label
        htmlFor="file-upload"
        id="file-drag"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={filePreview ? "hover" : ""}
      >
        {filePreview ? (
          <VideoPlayer videoSrc={uploadedVideoUrl || filePreview} />
        ) : (
          <div id="start ">
            <i className="fa fa-download" aria-hidden="true"></i>
            <p className="text-blue-300 text-sm">~ 200MB max</p>
            <div>Select a file or drag here</div>
            {errorMessage && <div id="notimage">{errorMessage}</div>}
            {uploading ? (
              <div>Uploading...</div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => fileInputRef.current.click()}
              >
                Select a file
              </button>
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
        style={{ display: "none" }}
      />
    </div>
  );
};

export default VideoUploader;
