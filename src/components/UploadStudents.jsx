import React, { useState } from "react";

const UploadStudents = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // clear any previous message
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload-students", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ Upload failed: " + data.message);
      }
    } catch (error) {
      setMessage("❌ Error uploading file. Backend might be down.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload Student Excel File</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        style={{ margin: "1rem 0" }}
      />

      <button onClick={handleUpload} style={{ padding: "0.5rem 1rem" }}>
        Upload
      </button>

      {message && (
        <p style={{ marginTop: "1rem", color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadStudents;
