import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeContent from './fadecontent';
import './home.css'
import BlurText from "./BlurText";
import ShinyText from './ShinyText';
const Home = () => {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  return (
    <>
    <div className="body">
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
     
  
<FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0}>
 

      <div className="top"  >
        <div className="image">
          <img src="img02.png" alt="" />
        </div>
        <div className='content'>
          This platform enables colleges and organizations to effortlessly post and promote events such as symposiums, workshops, seminars, sports meets, and cultural fests. Each event includes complete details like brochures, categories, and official registration links — making it easier than ever to reach the right audience.
          <br /><br />
          For students, it’s a one-stop space to explore events by interest, register quickly, and stay engaged with the campus community. Whether you're looking to boost your resume, gain knowledge, or just have fun participating, you’ll never miss an opportunity again.
        </div>
      </div>
      </FadeContent>
  
  
<ShinyText text="Dive In Now" disabled={false} speed={3} className='headers' data-aos="fade"  />
      <div className='button-container' >
        <div className='buttons'>
          <div className="button-splitter"  >
            <button onClick={() => navigate('/register')} data-aos="fade"  >User Registration</button>
            <button onClick={() => navigate('/login')}  data-aos="fade" >User Login</button>

          </div>
          <div className='button-splitter'>
            <button onClick={() => navigate('/orgregister')} data-aos="fade" >Organization Registration</button>
            <button onClick={() => navigate('/orglogin')} data-aos="fade" >Organization Login</button>
          </div>
        </div>
      </div>
      <ShinyText text="Experience the Best with These Features" disabled={false} speed={3} className='headers' data-aos="fade"  />
      <div className="infos">
  <div className="point">
    <h3>Centralized Event Discovery</h3>
    <p>
      Students can explore all upcoming events — from symposiums to sports meets — in one organized dashboard, sorted by category, institution, or date.
    </p>
  </div>

  <div className="point">
    <h3>Smart Registration Linking</h3>
    <p>
      Events include official <strong>Google Form or website registration links</strong>, allowing students to register directly at the organizer’s preferred platform with ease.
    </p>
  </div>

  <div className="point">
    <h3>Brochure & Media Access</h3>
    <p>
      Each event post includes downloadable <strong>PDF brochures, posters, or rulebooks</strong> so students can view all necessary details before registering.
    </p>
  </div>

  <div className="point">
  <h3>Smart Filtering Options</h3>
  <p>
    Students can easily <strong>filter events by category, date, or institution</strong> to quickly find the ones most relevant to their interests — no more scrolling through everything.
  </p>
</div>


  <div className="point">
    <h3>Mobile-Friendly Interface</h3>
    <p>
      The platform is fully responsive and optimized for mobile, allowing users to <strong>explore and register</strong> for events anytime, anywhere.
    </p>
  </div>
</div>
</div>
    <footer>
      Designed and Developed by DYC EDUWORKS
    </footer>

    </>
  );
};

export default Home;
