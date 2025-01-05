// frontend/src/components/landing/Upload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInput from "./Input";
import UploadButton from "./UploadButton";
import Popup from "../Popup";

const UploadForm = () => {
  const navigate = useNavigate();
  const [fileNames, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileNames(Array.from(files).map((file) => file.name));
      setSelectedFiles(Array.from(files));
    } else {
      setFileNames([]);
      setSelectedFiles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setPopup({
        isOpen: true,
        message: "Please choose at least one file to upload.",
        type: "warning",
      });
      return;
    }

    // File size check
    for (let file of selectedFiles) {
      if (file.size > 1 * 1024 * 1024 * 1024) {
        setPopup({
          isOpen: true,
          message: `File ${file.name} exceeds the 1GB limit.`,
          type: "error",
        });
        return;
      }
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("foto", file);
    });

    setIsLoading(true);

    try {
      const response = await fetch("https://chrono-sand.vercel.app/upload", {
        method: "POST",
        credentials: "include", // Important: This enables sending cookies
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to login if session is invalid
          navigate("/");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Clear form after successful upload
      setSelectedFiles([]);
      setFileNames([]);

      setPopup({
        isOpen: true,
        message: data.message,
        type: "success",
      });
    } catch (error) {
      setPopup({
        isOpen: true,
        message: "An error occurred during the upload. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="bg-white shadow rounded-lg p-8 mb-8"
        onSubmit={handleSubmit}
      >
        <FileInput fileNames={fileNames} handleFileChange={handleFileChange} />
        <UploadButton isLoading={isLoading} />
      </form>

      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </>
  );
};

export default UploadForm;
