import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand">Oris Habesha</div>
          <p className="footer-tagline">
            Celebrating authentic Ethiopian cloth with curated styles, cultural craftsmanship, and modern comfort.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.07C22 6.52 17.52 2 12 2S2 6.52 2 12.07c0 5 3.66 9.13 8.44 9.92v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34v7.03C18.34 21.2 22 17.07 22 12.07z"/>
              </svg>
            </a>
            <a href="#" className="footer-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.75 2h8.5C18.55 2 20 3.45 20 5.75v8.5c0 2.3-1.45 3.75-3.75 3.75h-8.5C5.45 18 4 16.55 4 14.25v-8.5C4 3.45 5.45 2 7.75 2zm8.5 1.5h-8.5c-1.24 0-2.25 1.01-2.25 2.25v8.5c0 1.24 1.01 2.25 2.25 2.25h8.5c1.24 0 2.25-1.01 2.25-2.25v-8.5c0-1.24-1.01-2.25-2.25-2.25zm-4.25 2.25a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.5a3 3 0 100 6 3 3 0 000-6zm4.75-.75a.75.75 0 110 1.5.75.75 0 010-1.5z"/>
              </svg>
            </a>
            <a href="#" className="footer-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 5.92c-.8.35-1.66.58-2.56.69a4.47 4.47 0 001.96-2.47 8.94 8.94 0 01-2.83 1.08 4.47 4.47 0 00-7.62 4.08A12.7 12.7 0 013 4.88a4.47 4.47 0 001.39 5.96c-.7-.02-1.36-.21-1.94-.53v.05a4.47 4.47 0 003.59 4.38 4.48 4.48 0 01-2.02.08 4.47 4.47 0 004.17 3.1A8.96 8.96 0 012 19.54a12.64 12.64 0 006.86 2.01c8.24 0 12.75-6.82 12.75-12.75 0-.19 0-.38-.01-.57A9.1 9.1 0 0022 5.92z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-block">
          <div className="footer-link-group">
            <div className="footer-link-group-title">Site Map</div>
            <Link to="/" className="footer-link">Homepage</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/stories" className="footer-link">Stories</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div className="footer-link-group">
            <div className="footer-link-group-title">Legal</div>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/returns" className="footer-link">Returns</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© {new Date().getFullYear()} Oris Habesha. All rights reserved.</div>
        <div className="footer-note">Authentic Ethiopian cloth, curated for cultural elegance.</div>
      </div>
    </footer>
  );
};

export default Footer;
