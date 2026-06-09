
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const token = localStorage.getItem('Token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:3000/contact',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: 'Your message has been sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to send message.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .contact-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            max-width: 800px;
            margin: 0 auto;
          }
          .contact-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem;
            border-bottom: none;
          }
          .contact-header h3 {
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            color: var(--primary-color);
            font-size: 1.2rem;
          }
          .contact-input .form-control {
            padding-left: 45px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            font-size: 1rem;
          }
          .contact-input .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(74, 111, 165, 0.2);
          }
          .contact-input textarea.form-control {
            min-height: 150px;
          }
          .submit-btn {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
            transition: all 0.3s ease;
            color: white;
          }
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
            color: white;
          }
          .submit-btn:disabled {
            opacity: 0.7;
            transform: none;
          }
          .back-btn {
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
            border: 1px solid #e9ecef;
            background-color: #fff;
            color: var(--primary-color);
            transition: all 0.3s ease;
          }
          .back-btn:hover {
            background-color: #f8f9fa;
            border-color: var(--primary-color);
            color: var(--primary-color);
          }
          .contact-info {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .contact-info a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
          }
          .contact-info a:hover {
            text-decoration: underline;
          }
          .social-icon {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            color: var(--secondary-color);
            transform: scale(1.2);
          }
          @media (max-width: 768px) {
            .contact-header {
              padding: 1.5rem;
            }
            .contact-input .form-control,
            .contact-info {
              font-size: 0.9rem;
            }
            .social-icon {
              font-size: 1.3rem;
            }
          }
          @media (max-width: 576px) {
            .contact-header {
              padding: 1.25rem;
            }
            .contact-header h3 {
              font-size: 1.5rem;
            }
            .submit-btn {
              width: 100%;
              justify-content: center;
            }
            .contact-info {
              padding: 1rem;
            }
          }
        `}
      </style>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Button
            className="back-btn mb-4 animate__animated animate__fadeIn"
            onClick={() => navigate('/posts')}
            aria-label="Back to posts"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Posts
          </Button>
          <Card className="contact-card shadow-lg animate__animated animate__fadeIn">
            <div className="contact-header">
              <h3 className="mb-0">📬 Contact Us</h3>
              <p>Get in touch with the Lost & Found team</p>
            </div>
            <Card.Body className="p-4">
              {message.text && (
                <Alert
                  variant={message.type}
                  className="animate__animated animate__fadeInDown"
                  dismissible
                  onClose={() => setMessage({ text: '', type: '' })}
                >
                  {message.type === 'success' ? (
                    <i className="bi bi-check-circle me-2"></i>
                  ) : (
                    <i className="bi bi-exclamation-circle me-2"></i>
                  )}
                  {message.text}
                </Alert>
              )}
              <Row>
                <Col md={6} className="mb-4">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 contact-input position-relative">
                      <Form.Label htmlFor="name">Name</Form.Label>
                      <i className="bi bi-person input-icon"></i>
                      <Form.Control
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-describedby="nameHelp"
                        placeholder="Enter your name"
                      />
                      <Form.Text id="nameHelp" muted>
                        Your full name
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 contact-input position-relative">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <i className="bi bi-envelope input-icon"></i>
                      <Form.Control
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-describedby="emailHelp"
                        placeholder="Enter your email"
                      />
                      <Form.Text id="emailHelp" muted>
                        We'll never share your email.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 contact-input position-relative">
                      <Form.Label htmlFor="message">Message</Form.Label>
                      <i className="bi bi-chat-text input-icon"></i>
                      <Form.Control
                        id="message"
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        aria-describedby="messageHelp"
                        placeholder="Your message or inquiry"
                      />
                      <Form.Text id="messageHelp" muted>
                        Tell us how we can assist you.
                      </Form.Text>
                    </Form.Group>
                    <div className="d-grid">
                      <Button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col md={6} className="mb-4">
                  <div className="contact-info">
                    <h5 className="mb-3" style={{ color: 'var(--primary-color)' }}>
                      Contact Information
                    </h5>
                    <p className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      <a href="mailto:support@lostandfound.com" aria-label="Email support">
                        support@lostandfound.com
                      </a>
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-telephone me-2"></i>
                      <a href="tel:+1234567890" aria-label="Call support">
                        +1 (234) 567-890
                      </a>
                    </p>
                    <p className="mb-3">
                      <i className="bi bi-geo-alt me-2"></i>
                      123 Lost & Found St, City, Country
                    </p>
                    <div className="d-flex">
                      <a
                        href="https://twitter.com"
                        className="social-icon"
                        aria-label="Follow us on Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-twitter-x"></i>
                      </a>
                      <a
                        href="https://facebook.com"
                        className="social-icon"
                        aria-label="Follow us on Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href="https://instagram.com"
                        className="social-icon"
                        aria-label="Follow us on Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
