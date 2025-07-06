import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './addContent.css'

const AddContent = () => {
  const navigate=useNavigate();
  const location =useLocation();
  const [userId,setUserId]=useState("")
    

  const setUserData=()=>{
    const user = location.state?.user.userName || "Unknown";
    // console.log(user.userName)
    setUserId(user)
  }

  useEffect(()=>{
    setUserData();
    console.log("UserId :",userId)
  },[userId])

  const [formData, setFormData] = React.useState({
    eventName: "",
    venue: "",
    timing: "",
    organizerName: "",
    organizerNumber: "",
    organizerMail: "",
    registrationLink: "",
    awards: "",
    entranceFees: "",
    category: "",
    description: "",
    pdfFile: null,
    otherContacts: [{ name: "", number: "" }],
    createdAt: new Date().toISOString(),
    createdBy: sessionStorage.getItem("userName")
  });

  const [pdfError, setPdfError] = React.useState("");
  const [uploadedPdfUrl, setUploadedPdfUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          setPdfError("Only PDF files are allowed.");
          setFormData((prev) => ({ ...prev, pdfFile: null }));
          setUploadedPdfUrl("");
        } else if (file.size > 200 * 1024) {
          setPdfError("File size must be less than 200KB.");
          setFormData((prev) => ({ ...prev, pdfFile: null }));
          setUploadedPdfUrl("");
        } else {
          setPdfError("");
          setFormData((prev) => ({ ...prev, pdfFile: file }));

          // Upload to Cloudinary
          const formDataUpload = new FormData();
          formDataUpload.append("file", file);
          formDataUpload.append("upload_preset", "upload_pdf");

          try {
            setUploading(true);
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dzpfbl3zr/raw/upload",
              formDataUpload
            );
            const url = res.data.secure_url;
            setUploadedPdfUrl(url);
          } catch (err) {
            console.error("PDF upload failed:", err);
            setPdfError("Upload failed. Try again.");
          } finally {
            setUploading(false);
          }
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleOtherContactChange = (idx, field, value) => {
    const updatedContacts = [...formData.otherContacts];
    updatedContacts[idx][field] = value;
    setFormData((prev) => ({
      ...prev,
      otherContacts: updatedContacts
    }));
  };

  const addOtherContactField = () => {
    setFormData((prev) => ({
      ...prev,
      otherContacts: [...prev.otherContacts, { name: "", number: "" }]
    }));
  };

  const removeOtherContactField = (idx) => {
    const updated = [...formData.otherContacts];
    updated.splice(idx, 1);
    setFormData((prev) => ({
      ...prev,
      otherContacts: updated
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedPdfUrl) {
      setPdfError("Please upload a valid PDF file less than 200KB.");
      return;
    }

    const finalForm = {
      ...formData,
      pdfFileUrl: uploadedPdfUrl
    };

    console.log("  Final Submitted Form:", finalForm);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/addEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalForm)
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("  Event submitted successfully!");
         setFormData({
      eventName: "",
      venue: "",
      timing: "",
      organizerName: "",
      organizerNumber: "",
      organizerMail: "",
      registrationLink: "",
      awards: "",
      entranceFees: "",
      category: "",
      description: "",
      pdfFile: null,
      otherContacts: [{ name: "", number: "" }],
    });
    setUploadedPdfUrl("");
    setPdfError("");
           navigate('/orgdashboard',{state:{user:userId}});
      } else {
        setSuccessMessage("  Error submitting event.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("  Error submitting event.");
    }

   
  };

  return (
    <div className="add-content-container">
      <h1 className="add-content-title">Add Event</h1>
      <form className="add-content-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Event Name:</label>
          <input className="form-input" type="text" name="eventName" required value={formData.eventName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select className="form-select" name="category" required value={formData.category} onChange={handleChange}>
            <option value="">-- Select Event Category --</option>
            <option value="arts">Arts & Literature</option>
            <option value="cultural">Cultural Programs</option>
            <option value="technical">Technical Events</option>
            <option value="mathematical">Mathematics-Based Events</option>
            <option value="science">Science & Innovation</option>
            <option value="sports">Sports</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
            <option value="mixed">Interdisciplinary / Mixed Events</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Venue:</label>
          <input className="form-input" type="text" name="venue" required value={formData.venue} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Timing:</label>
          <input className="form-input" type="datetime-local" name="timing" required value={formData.timing} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Organizer Name:</label>
          <input className="form-input" type="text" name="organizerName" required value={formData.organizerName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Organizer Number:</label>
          <input className="form-input" type="tel" name="organizerNumber" pattern="[0-9]{10}" required value={formData.organizerNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Organizer Email:</label>
          <input className="form-input" type="email" name="organizerMail" required value={formData.organizerMail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Other Contact Persons:</label>
          {formData.otherContacts.map((contact, idx) => (
            <div key={idx} className="other-contact-row">
              <input
                className="form-input other-contact-input"
                type="text"
                placeholder="Name"
                value={contact.name}
                required
                onChange={e => handleOtherContactChange(idx, 'name', e.target.value)}
              />
              <input
                className="form-input other-contact-input"
                type="tel"
                placeholder="Number"
                value={contact.number}
                required
                onChange={e => handleOtherContactChange(idx, 'number', e.target.value)}
              />
              {formData.otherContacts.length > 1 && (
                <button className="remove-contact-btn" type="button" onClick={() => removeOtherContactField(idx)}>Remove</button>
              )}
            </div>
          ))}
          <button className="add-contact-btn" type="button" onClick={addOtherContactField}>Add Another Contact</button>
        </div>
        <div className="form-group">
          <label className="form-label">Registration Link:</label>
          <input className="form-input" type="url" name="registrationLink" required value={formData.registrationLink} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Awards:</label>
          <input className="form-input" type="text" name="awards" value={formData.awards} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Entrance Fees:</label>
          <input className="form-input" type="number" name="entranceFees" min="0" step="any" value={formData.entranceFees} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea className="form-textarea" name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Upload PDF (max 200KB):</label>
          <input className="form-input" type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} required />
          {pdfError && <div className="pdf-error">{pdfError}</div>}
        </div>

        { uploading && <p className="uploading-text">Uploading PDF...</p> }
  {
    uploadedPdfUrl && (
      <div className="pdf-preview-container">
        <h4 className="pdf-preview-title">PDF Preview:</h4>
        <iframe
          src={`https://docs.google.com/viewer?url=${uploadedPdfUrl}&embedded=true`}
          width="100%"
          height="400px"
          className="pdf-preview-iframe"
          title="PDF Preview"
        ></iframe>
      </div>
    )
  }
        <br />
        <button className="submit-btn" type="submit">Submit</button>
  { successMessage && <p className="success-message">{successMessage}</p> }
      </form >
    </div >
  );
};

export default AddContent;
