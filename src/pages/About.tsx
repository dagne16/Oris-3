import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about-page">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome to Oris Habesha Traditional Cloth House In North America...
        </p>
        {/* Add your about content here */}
      </div>
    </section>
  );
};

export default About;