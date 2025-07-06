import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VantaBackground from './vantabackground';
import './register.css'; // 👈 Importing the CSS

const Register = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert('Registration failed: ' + data.message);
    }
  };

  return (
    <>
      <div className="body1">
        <VantaBackground /> {/* Optional animated bg if using Vanta */}
        <div className="body10">
          <div className="register-container glass-card">
            <h1 className='topic' >USER REGISTRATION</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="all-inputs">
                <div className="inputs">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="userName">User Name (E-mail)</label>
                  <input className="input"
                    type="email"
                    id="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="password">Password</label>
                  <input className="input"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <input type="submit" value="Register" className=" input submit-btn" />
              <h3 className="navigator">Already Registerd? <span onClick={() => { navigate('/login') }}>Login</span> </h3>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
