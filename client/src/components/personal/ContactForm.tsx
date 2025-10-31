import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/personal/contact.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", website: "", message: "" });
    }, 3000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="contact-label">Get in Touch</span>
          
          <h2 className="contact-title">
            <span className="title-line">Ready to Build</span>
            <span className="title-line accent">Something Amazing?</span>
          </h2>
          
          <p className="contact-subtitle">
            Let's create something extraordinary that elevates your brand.
            <br />
            Drop me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="contact-form-wrapper">
          
          <form className="contact-form" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div className={`form-field ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <div className="field-line"></div>
            </div>

            {/* Email Field */}
            <div className={`form-field ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <div className="field-line"></div>
            </div>

            {/* Website Field */}
            <div className={`form-field ${focusedField === 'website' || formData.website ? 'focused' : ''}`}>
              <label htmlFor="website">Website / Portfolio (Optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                onFocus={() => setFocusedField('website')}
                onBlur={() => setFocusedField(null)}
              />
              <div className="field-line"></div>
            </div>

            {/* Message Field */}
            <div className={`form-field ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
              <label htmlFor="message">Tell Me About Your Project</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                required
              />
              <div className="field-line"></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitted}
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="btn-content"
                  >
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M18 2L9 11M18 2l-7 16-2-7-7-2 16-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                ) : (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="btn-content"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10l4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message Sent!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </form>

          {/* Contact Info Sidebar */}
          <div className="contact-information">
            <h3>Let's Connect</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>
            
            <div className="info-items">
              <a href="mailto:kathan@example.com" className="info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">kathan@example.com</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/kathanthaker" className="info-item" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <div>
                  <span className="info-label">LinkedIn</span>
                  <span className="info-value">@kathanthaker</span>
                </div>
              </a>

              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">London, ON, Canada</span>
                </div>
              </div>
            </div>

            <div className="availability-badge">
              <span className="status-dot"></span>
              Available for Projects
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}