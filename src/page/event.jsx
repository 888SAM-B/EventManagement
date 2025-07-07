import React from 'react';
import { useLocation } from 'react-router-dom';
import './event.css'; // create this CSS file separately

const Event = () => {
  const location = useLocation();
  const data = location.state?.event || {};

  return (
    <div className="event-details">
      <h2>{data.eventName}</h2>
      <div className="info">
        <p><strong>Venue:</strong> {data.venue}</p>
        <p><strong>Timing:</strong> {new Date(data.timing).toLocaleString()}</p>
        <p><strong>Organization:</strong> {data.organizerName}</p>
        <p><strong>Organizer Number:</strong> {data.organizerNumber}</p>
        <p><strong>Organizer Email:</strong> {data.organizerMail}</p>
        <p><strong>Registration Link:</strong> <a href={data.registrationLink} target="_blank" rel="noopener noreferrer">{data.registrationLink}</a></p>
        <p><strong>Awards:</strong> {data.awards}</p>
        <p><strong>Entrance Fees:</strong> {data.entranceFees}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
        <p><strong>Created By:</strong> {data.createdBy}</p>

        {data.otherContacts?.length > 0 && (
          <div className="contacts">
            <h3>Other Contacts:</h3>
            <ul>
              {data.otherContacts.map((contact, index) => (
                <li key={index}>
                  <p><strong>Name:</strong> {contact.name}</p>
                  <p><strong>Number:</strong> {contact.number}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.pdfFileUrl && (
          <div className="pdf-section">
            <h3>Event PDF:</h3>
            <a href={data.pdfFileUrl} download rel="noopener noreferrer">
              <button className="download-btn">Download PDF</button>
            </a>

            <iframe
              src={`https://docs.google.com/viewer?url=${data.pdfFileUrl}&embedded=true`}
              width="100%"
              height="500px"
              title="PDF Preview"
              className="pdf-preview"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
