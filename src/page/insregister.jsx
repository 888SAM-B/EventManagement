import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VantaBackground from './vantabackground';
import './register.css';

const InsRegister = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const [insName, setInsName] = useState('');
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    const response = await fetch(`${url}/insregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        insName,
        number,
        userName,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Registration successful!');
      navigate('/orglogin');
    } else {
      alert('Registration failed: ' + data.message);
    }
  };

  return (
    <>
      <div className="body1">
        <VantaBackground />
        <div className="body10">
          <div className="register-container register-container-big glass-card">
            <h1 className="topic">ORGANIZATION REGISTRATION</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="all-inputs">

                <div className="inputs">
                  <label htmlFor="insName">Organization Name</label>
                  <input
                    type="text"
                    id="insName"
                    onChange={(e) => setInsName(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    type="number"
                    id="contact"
                    onChange={(e) => setNumber(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="userName">User Name (E-mail)</label>
                  <input
                    type="email"
                    id="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div className="inputs">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                  

                <div className="inputs">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    required
                  />
                </div>

              </div>
              <input
                type="submit"
                value="Register"
                className="input submit-btn"
              />
            </form>
            <h3 className="navigator">Already Registerd? <span onClick={()=>{navigate('/orglogin')}}>Login</span> </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsRegister;
