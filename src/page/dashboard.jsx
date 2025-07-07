import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './insdashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ data: [], filtered: null });
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUser = async () => {
    const userParam = location.state?.user || "Unknown";
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/fetchUser?user=${userParam}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const res = await response.json();
      if (res.success) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      setUser(null);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/getData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "username": sessionStorage.getItem("username")
        },
      });
      const res = await response.json();
      if (res.success) {
        setData({ data: res.data, filtered: null });
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

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setData(prev => ({
      ...prev,
      filtered: category === ""
        ? null
        : prev.data.filter(ev => ev.category === category)
    }));
  };

  const eventsToDisplay = data.filtered || data.data;

  const sortedEvents = [...eventsToDisplay].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.timing) - new Date(b.timing)
      : new Date(b.timing) - new Date(a.timing)
  );

  return (
    <div className="body-dashboard">
      <h1>Dashboard</h1>

      {user ? (
        <div>
          <h2>User Details:</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Username:</strong> {user.userName}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}

      <div className="sort-buttons">
        <div className="sort-item">
          <span className="text">Sort by:</span>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>

        <div className="sort-item">
          <span className="text">Filter by Category:</span>
          <select onChange={handleCategoryFilter} defaultValue="">
            <option value="">All</option>
            {Array.from(new Set(data.data.map(ev => ev.category))).map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="event-header">Events List:</h2>

      <div className="container">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event._id} className="events">
              <h3>{event.eventName}</h3>
              <p><strong>Category:</strong> {event.category.toUpperCase()}</p>
              <p><strong>Organization:</strong> {event.organizerName}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p>
                <strong>Schedule:</strong>{" "}
                {new Date(event.timing).toLocaleString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
              <button onClick={() => navigate(`/event`, { state: { event } })}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
