// Footer.js

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            {/* Add more links to your site pages */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
