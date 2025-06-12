import React, { useState } from "react";
import { uploadResume } from "../../api";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await uploadResume(formData);
      alert("Resume Uploaded & Parsed Successfully!");
      setFile(null);
      document.getElementById("resumeFile").value = "";
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Error uploading resume. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Upload Resume:</label>
        <input
          id="resumeFile"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit">Upload & Parse</button>
    </form>
  );
};

export default UploadForm;
