import React, { useState } from 'react';
import './ContactPage.css'; // Import your new styles

const ContactPage = () => {
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Function to update state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just log the data and show an alert.
    // In a real app, you'd send this data to your backend.
    console.log('Form data submitted:', formData);
    alert('Thank you for your message!');
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      
      {/* Section 1: Your Information */}
      <div className="contact-info">
        <h2>Contact Information</h2>
        <div className="info-item">
          <i className="fa-solid fa-user"></i>
          <span>Tejas Desale</span>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-envelope"></i>
          <span>tejas.desale@example.com</span>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-phone"></i>
          <span>+91 9999999999</span>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-location-dot"></i>
          <span>Pimpri-Chinchwad, Maharashtra, India</span>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/tejas-desale-657b54309/"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/Tejas5504"><i className="fa-brands fa-github"></i></a>
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
        </div>
      </div>

      {/* Section 2: Contact Form */}
      <div className="contact-form">
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

    </div>
  );
};

export default ContactPage;