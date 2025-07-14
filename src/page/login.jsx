import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VantaBackground from './vantabackground';
import './register.css'; // Reusing same styles for consistency

const Login = () => {
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userId, password }),
      });

      const result = await response.json();
      console.log('result', result);

      if (result.success) {
        alert(result.message);
        sessionStorage.setItem('userName', userId);
        navigate('/dashboard', { state: { user: userId } });
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
            <h1 className="topic">USER LOGIN</h1>
            <form
              className="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="all-inputs">
                <div className="inputs">
                  <label htmlFor="userid">User ID (E-mail)</label>
                  <input
                    type="text"
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
            <h3 className="navigator">Haven't Registerd? <span onClick={()=>{navigate('/register')}}>Sign Up</span> </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
