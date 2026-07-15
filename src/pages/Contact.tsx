import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Reach out with any questions or inquiries.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-block">
              <h3>Email</h3>
              <p><a href="mailto:hello@orishabesha.com">hello@orishabesha.com</a></p>
            </div>

            <div className="info-block">
              <h3>Phone</h3>
              <p><a href="tel:+1-202-555-0147">+1 (202) 555-0147</a></p>
            </div>

            <div className="info-block">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 4:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="info-block">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>

            <div className="info-block">
              <h3>Address</h3>
              <p>Oris Habesha Cloth Store</p>
              <p>1425 K Street NW</p>
              <p>Washington, DC 20005</p>
              <p>United States</p>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} required></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
