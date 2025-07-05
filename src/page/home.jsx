import React from 'react';
import { useNavigate } from 'react-router-dom';
import VantaBackground from './vantabackground';
import './home.css'
import BlurText from "./BlurText";
const Home = () => {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  return (
    <>
      <div className="animate-container">
        <BlurText
          text="EVENT MANAGEMENT SYSTEM"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="animate01"
        />
      </div>
      <div>
        <div>
          <button onClick={() => navigate('/register')}>User Registration</button>
          <button onClick={() => navigate('/login')}>User Login</button>
          <br /><br />
          <button onClick={() => navigate('/orgregister')}>Organization Registration</button>
          <button onClick={() => navigate('/orglogin')}>Organization Login</button>
        </div>
      </div>
    </>
  );
};

export default Home;
