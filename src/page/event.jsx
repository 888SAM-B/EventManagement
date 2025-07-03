import React from 'react'
import { useLocation } from 'react-router-dom'
const event = () => {
    const location = useLocation();
    const data = location.state?.event || {};
  return (
    <div>
      <h2>{data.eventName}</h2>
      <p>Venue: {data.venue}</p>
      <p>Timing: {new Date(data.timing).toLocaleString()}</p>
      <p>Organization: {data.organizerName}</p>
        <p>Organizer Number: {data.organizerNumber}</p>
        <p>Organizer Email: {data.organizerMail}</p>
        <p>Registration Link: <a href={data.registrationLink} target="_blank" rel="noopener noreferrer">{data.registrationLink}</a></p>
        <p>Awards: {data.awards}</p>
        <p>Entrance Fees: {data.entranceFees}</p>
        <p>Description: {data.description}</p>
        <p>Category: {data.category}</p>
        <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Created By: {data.createdBy}</p>
        <h3>Other Contacts:</h3>
        <ul>    
            {data.otherContacts && data.otherContacts.map((contact, index) => (
                <li key={index}>
                <p>Name: {contact.name}</p>
                <p>Number: {contact.number}</p>
                </li>
            ))}
        </ul>
        {data.pdfFileUrl && (
            <div>
                <h3>Event PDF:</h3>
                <a href={data.pdfFileUrl} download rel="noopener noreferrer">
                    <button>Download PDF</button>
                </a>
            </div>
        )}
          <iframe
              src={`https://docs.google.com/viewer?url=${data.pdfFileUrl}&embedded=true`}
              width="50%"
              height="400px"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              title="PDF Preview"
            ></iframe>
    </div>
  )
}

export default event