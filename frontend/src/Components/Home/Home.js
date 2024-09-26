import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css'; 
import videoSrc from '../../videos/vd3.mp4';
import Footer from '../Footer/Footer'; 
import Chatbot from './Chatbot'; // Import the Chatbot component

const Home = () => {
  return (
    <div className="home-container">
      <section className="intro-section">
        <h2>Welcome</h2>
        <p>"At Ideology, we turn visionary ideas into reality. Our platform is designed to foster creativity, connect like-minded innovators, and transform concepts into impactful solutions. Whether you're here to share ideas, collaborate on projects, or explore the future of innovation, we're thrilled to have you on this journey."</p>
      </section>
      
      <section className="video-section">
        <video autoPlay muted loop className="video-player">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section id="idea-section" className="idea-section">
        <h3>Share Your Ideas</h3>
        <p>Join our community of creative thinkers and innovators. Submit your ideas, explore others' creations, and be inspired to make a difference.</p>
        <Link to="/ideas-submit">
          <button className="submit-idea-button">Submit Idea</button>
        </Link>
      </section>
   
      {/* Include the Chatbot component */}
      <Chatbot />
      
      {/* Include the Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Home;