import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home: React.FC = () => {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Oris Habesha <br />
            <span className="highlight">Cloth Store</span>
          </h1>
          
          <p className="hero-description">
            Welcome to Oris Habesha Traditional Cloth House In North America,<br />
            your premier destination for authentic Ethiopian clothing that<br />
            celebrates the rich cultural heritage of Ethiopia.
          </p>
          {/* <ColorStrip color="#F7E7D9" className="gap-top" /> */}
          
          <Link to="/products" className="read-more-btn">Shop Now</Link>
        </div>

        <div className="hero-image">
          <div className="hero-image-backdrop" />
          <div className="hero-image-card hero-image-card--main">
            <img
              src="/image1.png"
              alt="Traditional Ethiopian cloth"
              className="hero-image-img"
            />
          </div>
          <div className="hero-image-card hero-image-card--accent">
            <img
              src="image 8.png"
              alt="Ethiopian fashion accent"
              className="hero-image-img"
            />
          </div>
          <div className="hero-image-card hero-image-card--side">
            <img
              src="/image (2).png"
              alt="Ethiopian cloth detail"
              className="hero-image-img"
            />
          </div>
          {/* <ColorStrip color="#E8F6F8" className="gap-top" /> */}
        </div>
      </div>
    </section>
  );
};

export default Home;