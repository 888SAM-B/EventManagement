import React from 'react';
import axios from 'axios';

const AddContent = () => {
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
      } else {
        setSuccessMessage("  Error submitting event.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("  Error submitting event.");
    }

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
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div><label>Event Name:</label>
          <input type="text" name="eventName" required value={formData.eventName} onChange={handleChange} />
        </div>
        <div><label>Category:</label>
          <select name="category" required value={formData.category} onChange={handleChange}>
            <option value="">-- Select Event Category --</option>
            <option value="technical">Technical Events</option>
            <option value="cultural">Cultural Programs</option>
            <option value="mathematical">Mathematics-Based Events</option>
            <option value="science">Science & Innovation</option>
            <option value="arts">Arts & Literature</option>
            <option value="mixed">Interdisciplinary / Mixed Events</option>
          </select>
        </div>
        <div><label>Venue:</label>
          <input type="text" name="venue" required value={formData.venue} onChange={handleChange} />
        </div>
        <div><label>Timing:</label>
          <input type="datetime-local" name="timing" required value={formData.timing} onChange={handleChange} />
        </div>
        <div><label>Organization Name:</label>
          <input type="text" name="organizerName" required value={formData.organizerName} onChange={handleChange} />
        </div>
        <div><label>Organizer Number:</label>
          <input type="tel" name="organizerNumber" pattern="[0-9]{10}" required value={formData.organizerNumber} onChange={handleChange} />
        </div>
        <div><label>Organizer Email:</label>
          <input type="email" name="organizerMail" required value={formData.organizerMail} onChange={handleChange} />
        </div>
        <div>
          <label>Other Contact Persons:</label>
          {formData.otherContacts.map((contact, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={e => handleOtherContactChange(idx, 'name', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Number"
                value={contact.number}
                onChange={e => handleOtherContactChange(idx, 'number', e.target.value)}
              />
              {formData.otherContacts.length > 1 && (
                <button type="button" onClick={() => removeOtherContactField(idx)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addOtherContactField}>Add Another Contact</button>
        </div>
        <div><label>Registration Link:</label>
          <input type="url" name="registrationLink" required value={formData.registrationLink} onChange={handleChange} />
        </div>
        <div><label>Awards:</label>
          <input type="text" name="awards" value={formData.awards} onChange={handleChange} />
        </div>
        <div><label>Entrance Fees:</label>
          <input type="number" name="entranceFees" min="0" step="any" value={formData.entranceFees} onChange={handleChange} />
        </div>
        <div><label>Description:</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Upload PDF (max 200KB):</label>
          <input type="file" name="pdfFile" accept="application/pdf" onChange={handleChange} required />
          {pdfError && <div style={{ color: 'red' }}>{pdfError}</div>}
        </div>

        {uploading && <p>Uploading PDF...</p>}
        {uploadedPdfUrl && (
          <div style={{ marginTop: "20px" }}>
            <h4>PDF Preview:</h4>
            <iframe
              src={`https://docs.google.com/viewer?url=${uploadedPdfUrl}&embedded=true`}
              width="100%"
              height="400px"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              title="PDF Preview"
            ></iframe>
          </div>
        )}
        <br />
        <button type="submit">Submit</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddContent;
