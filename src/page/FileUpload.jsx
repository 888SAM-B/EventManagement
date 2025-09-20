import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 200 * 1024) {
      alert("PDF must be under 200KB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "upload_pdf"); // replace with your preset

    try {
      setUploading(true);

      // Upload to Cloudinary (raw type is safer for PDF)
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzpfbl3zr/raw/upload",
        formData
      );

      const uploadedUrl = res.data.secure_url;

      if (!uploadedUrl) {
        alert("Upload succeeded but file URL is missing.");
        return;
      }

      setFileUrl(uploadedUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    alert(`PDF URL Submitted:\n${fileUrl}`);
    // You can send fileUrl to your backend here
  };

  return (
    <div style={{ padding: "20px", maxWidth: "450px" }}>
      <h2>📄 PDF Upload</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {uploading && <p>Uploading file...</p>}

      {fileUrl && (
        <>
          <p style={{ color: "green" }}>✅ PDF Uploaded Successfully!</p>

          {/* Preview using Google Docs Viewer */}
          <div style={{ marginTop: "20px" }}>
  <h4>📄 PDF Preview:</h4>
  <iframe
    src={`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`}
    width="100%"
    height="500px"
    style={{ border: "1px solid #ccc", borderRadius: "8px" }}
    title="PDF Preview"
  ></iframe>
</div>


          {/* Direct Download */}
          <a
            href={fileUrl}
            download
            
            rel="noopener noreferrer"
          >
            <button>⬇️ Download PDF</button>
          </a>

          <br /><br />

          {/* Submit PDF URL */}
          <button onClick={handleSubmit}>📤 Submit PDF Link</button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
