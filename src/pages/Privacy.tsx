import React from 'react';
import './Privacy.css';

const Privacy: React.FC = () => {
  return (
    <section className="privacy">
      <div className="page-container">
        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: July 8, 2026</p>
        </div>

        <div className="page-content">
          <h2>1. Introduction</h2>
          <p>
            Oris Habesha Cloth Store ("we," "us," or "our") operates the website. This page informs you of our policies 
            regarding the collection, use, and disclosure of personal data when you use our service and the choices you 
            have associated with that data.
          </p>

          <h2>2. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>
          <ul>
            <li>Personal Data: While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and usage data</li>
              </ul>
            </li>
          </ul>

          <h2>3. Use of Data</h2>
          <p>Oris Habesha uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>4. Security of Data</h2>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet or 
            method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect 
            your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2>5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
            Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: <a href="mailto:privacy@orishabesha.com">privacy@orishabesha.com</a><br />
            Phone: <a href="tel:+1-202-555-0147">+1 (202) 555-0147</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
