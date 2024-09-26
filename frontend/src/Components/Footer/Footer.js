// src/Components/Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Ideology</h2>
          <p>
            Stay connected with us! Follow and subscribe to our social media platforms for regular updates on learning new ideas. Happy Learning!
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Ideas</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>More</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Campus Ambassador</a></li>
            <li><a href="#">Growth Community</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacts</h3>
          <p><i className="fas fa-phone-alt"></i> +91-08883333444</p>
          <p><i className="fas fa-envelope"></i> support@ideology.com</p>
          <input type="email" placeholder="Enter Mail" />
          <button><i className="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;