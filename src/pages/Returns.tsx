import React from 'react';
import './Returns.css';

const Returns: React.FC = () => {
  return (
    <section className="returns">
      <div className="page-container">
        <div className="page-header">
          <h1>Returns & Exchanges</h1>
          <p className="subtitle">We stand behind the quality of our products</p>
        </div>

        <div className="page-content">
          <h2>Return Policy</h2>
          <p>
            At Oris Habesha, we want you to be completely satisfied with your purchase. If you're not happy with your 
            item, we offer hassle-free returns within 30 days of purchase.
          </p>

          <h3>Return Eligibility</h3>
          <ul>
            <li>Items must be returned within 30 days of purchase</li>
            <li>Items must be in original condition with all tags attached</li>
            <li>Items must be unwashed and unworn</li>
            <li>Original receipt or proof of purchase is required</li>
          </ul>

          <h3>How to Return an Item</h3>
          <ol>
            <li>Contact us at <a href="mailto:returns@orishabesha.com">returns@orishabesha.com</a> with your order number</li>
            <li>Receive a prepaid return shipping label</li>
            <li>Pack your item securely in original packaging</li>
            <li>Ship the package using the provided label</li>
            <li>Receive your refund within 7-10 business days of delivery</li>
          </ol>

          <h3>Exchanges</h3>
          <p>
            If you'd prefer to exchange your item for a different size or color, we offer free exchanges within 30 days 
            of purchase. Simply contact us with your order number and specify the item you'd like instead.
          </p>

          <h2>Refund Process</h2>
          <p>
            Refunds are processed within 7-10 business days after we receive and inspect your returned item. Your original 
            shipping costs are non-refundable. Please allow 2-3 additional business days for the refund to appear in your 
            original payment method.
          </p>

          <h2>Non-Returnable Items</h2>
          <p>
            The following items are non-returnable:
          </p>
          <ul>
            <li>Items with signs of wear or damage</li>
            <li>Items without original tags</li>
            <li>Items that have been washed or altered</li>
            <li>Custom or personalized items</li>
            <li>Items purchased on sale or clearance (final sale items)</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions about returns? We're here to help!
          </p>
          <p>
            Email: <a href="mailto:returns@orishabesha.com">returns@orishabesha.com</a><br />
            Phone: <a href="tel:+1-202-555-0147">+1 (202) 555-0147</a><br />
            Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </section>
  );
};

export default Returns;
