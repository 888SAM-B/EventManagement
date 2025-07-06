import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './insdashboard.css'
import ShinyText from './ShinyText';
const InsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState({ data: [], filtered: null });
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUser = async () => {
    const userParam = location.state?.user || "Unknown";
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/fetchOrgUser?user=${userParam}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      if (res.success) setUser(res.user);
      else setUser(null);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const eventsToDisplay = data.filtered || data.data;

  const filteredBySearch = eventsToDisplay.filter(ev =>
    ev.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEvents = [...filteredBySearch].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.timing) - new Date(b.timing)
      : new Date(b.timing) - new Date(a.timing)
  );

  const ourEvents = sortedEvents.filter(ev => ev.createdBy === user?.userName);
  const otherEvents = sortedEvents.filter(ev => ev.createdBy !== user?.userName);

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>No user found</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }} className='body-dashboard' >
      <h1 style={{ textAlign: "center" }} >{user.orgName}</h1>
      <button onClick={() => navigate('/add-content', { state: { user: user } })} className='add-button' >
        + Add Event
      </button>
      <br />
      <div className="sort-buttons">
        <div className='sort-item'>
          <div className="text">Search:</div>
          <input
            type="text"
            placeholder="Search by event name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>


        <div className='sort-item'>
          <div className="text"> Sort by: </div>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>

        <div className='sort-item'>
          <div className="text"> Filter by Category: </div>
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

      <ShinyText text="YOUR EVENTS" disabled={false} speed={3} className='headers event-header' data-aos="fade" />
      <div className="container">
        {ourEvents.length === 0 ? (
          <p>No events created by you.</p>
        ) : (
          ourEvents.map(ev => (
            <div key={ev._id} style={{ marginBottom: "10px" }} className='events'>
              <h3>{ev.eventName.toUpperCase()}</h3>
              <p><strong>Category:</strong> {ev.category?.toUpperCase()}</p>
              <p><strong>Organization:</strong> {ev.organizationName}</p>
              <p><strong>Venue:</strong> {ev.venue}</p>
              <p>
                <strong>Schedule:</strong>{" "}
                {ev.timing
                  ? new Date(ev.timing).toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })
                  : "N/A"}
              </p>
              <button onClick={() => navigate(`/event`, { state: { event: ev } })}>
                View Details
              </button>
            </div>
          ))
        )}
      </div>
      <br />
      

      <h1>Other Events</h1>
      <ul style={{ listStyle: "none", padding: 0 }} className='container'>
        {otherEvents.length > 0 ? (
          otherEvents.map(event => (
            <li key={event._id} className='events'>
              <h3>{event.eventName}</h3>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Organization:</strong> {event.organizerName}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p>
                <strong>Schedule:</strong>{" "}
                {event.timing
                  ? new Date(event.timing).toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })
                  : "N/A"}
              </p>
              <button onClick={() => navigate(`/event`, { state: { event } })}>
                View Details
              </button>
            </li>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default InsDashboard;
