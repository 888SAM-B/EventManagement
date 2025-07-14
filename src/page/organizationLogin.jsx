import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VantaBackground from './vantabackground';
import './register.css'; // Reusing the same CSS

const OrganizationLogin = () => {
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  const fetchOrgs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/fetchOrg`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      console.log(res.orgNames);
      setInstitutions(res.orgNames);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    fetchOrgs();
    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/inslogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institution,
          userName: userId,
          password,
        }),
      });

      const result = await response.json();
      console.log('result', result);

      if (result.success) {
        alert(result.message);
        sessionStorage.setItem('userName', userId);
        navigate('/orgdashboard', { state: { user: userId } });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log('Error', error);
      alert('Login Failed');
    }
  };

  return (
    <>
      <div className="body1">
        
        <div className="body10">
          <div className="register-container glass-card">
            <h1 className="topic">ORGANIZATION LOGIN</h1>
            <form
              className="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="all-inputs">
                <div className="inputs">
                  <label htmlFor="institution"> Name of the Organization </label>
                  <select
                    id="institution"
                    className="input"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                  >
                    <option value="">Select Organization</option>
                    {institutions.map((ins, idx) => (
                      <option key={idx} value={ins}>
                        {ins}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inputs">
                  <label htmlFor="userid">User ID (E-mail)</label>
                  <input
                    type="email"
                    id="userid"
                    className="input"
                    onChange={(e) => setUserid(e.target.value)}
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Login"
                className="input submit-btn"
              />
            </form>
            <h3 className="navigator">Haven't Registerd? <span onClick={()=>{navigate('/orgregister')}}>Sign Up</span> </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationLogin;
