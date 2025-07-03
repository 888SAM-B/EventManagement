import { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation();
  const navigate= useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const fetchUser = async () => {
    const userParam = location.state?.user || "Unknown";
    console.log(userParam);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/fetchUser?user=${userParam}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const res = await response.json();
      console.log(res.user);
      if (res.success) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Handle the fetched data as needed
        setData(data);
        console.log("Fetched Data:", data.data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>User Details:</h2>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Username: {user.userName}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
      <button onClick={() => {navigate('/add-content')}} >ADD CONTENT</button>

      <h2>Events List:</h2>
      <ul>
        {data.data && data.data.map((event) => (
          <li key={event._id}>
            <h3>{event.eventName}</h3>
            <p>Venue: {event.venue}</p>
            <p>Timing: {new Date(event.timing).toLocaleString()}</p>
            <p>Organization: {event.organizerName}</p>
            <button onClick={() => navigate(`/event`, { state: { event } })} >Detail</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Dashboard