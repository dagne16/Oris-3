import React from 'react';
import './Stories.css';

const Stories: React.FC = () => {
  return (
    <section className="stories">
      <div className="page-container">
        <div className="page-header">
          <h1>Our Stories</h1>
          <p className="subtitle">Behind every cloth is a story of culture and heritage</p>
        </div>

        <div className="page-content">
          <article className="story-card">
            <h2>The Journey of Oris Habesha</h2>
            <p className="story-date">July 2022</p>
            <p>
              Oris Habesha was founded with a mission to bring authentic Ethiopian cloth and traditional wear to North America. 
              What started as a passion project has grown into a thriving community celebrating the rich cultural heritage of Ethiopia.
            </p>
            <p>
              Our founder, inspired by the vibrant colors and intricate patterns of traditional Ethiopian garments, decided to create 
              a space where people could access authentic pieces that honor this beautiful heritage while celebrating modern style.
            </p>
          </article>

          <article className="story-card">
            <h2>Understanding Traditional Ethiopian Cloth</h2>
            <p className="story-date">May 2023</p>
            <p>
              Ethiopian cloth carries centuries of cultural significance. From the intricate weaving patterns to the natural dyes 
              used, each piece tells a story of craftsmanship and tradition.
            </p>
            <p>
              The traditional Habesha dress represents more than just clothing—it represents identity, history, and pride. These 
              garments are worn during celebrations, festivals, and important life events, making each purchase a connection to 
              Ethiopian culture.
            </p>
          </article>

          <article className="story-card">
            <h2>Bridging Cultures Through Fashion</h2>
            <p className="story-date">February 2024</p>
            <p>
              In our North American community, we've discovered that traditional Ethiopian cloth appeals to people from all 
              backgrounds. What makes us unique is our commitment to education—we help our customers understand the history 
              and significance of each piece.
            </p>
            <p>
              From wedding celebrations to cultural festivals, Oris Habesha has become a destination for anyone looking to celebrate 
              and honor Ethiopian heritage through beautiful, authentic clothing.
            </p>
          </article>

          <article className="story-card">
            <h2>Supporting Artisans and Communities</h2>
            <p className="story-date">June 2024</p>
            <p>
              We're proud to work directly with artisans and weavers in Ethiopia and the diaspora. By choosing Oris Habesha, you're 
              supporting traditional craftsmanship and helping to preserve these beautiful cultural practices for future generations.
            </p>
            <p>
              Our commitment goes beyond business—it's about creating sustainable partnerships with our suppliers and giving back 
              to the communities that have inspired our work.
            </p>
          </article>

          <article className="story-card">
            <h2>Join Our Community</h2>
            <p className="story-date">Ongoing</p>
            <p>
              We invite you to be part of the Oris Habesha story. Whether you're looking for your first piece of traditional Ethiopian 
              cloth or you're a longtime collector, there's a place for you in our community.
            </p>
            <p>
              Follow us on social media, visit our store, or reach out with your own stories. Together, we're celebrating Ethiopian 
              culture and creating connections that transcend borders.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Stories;
