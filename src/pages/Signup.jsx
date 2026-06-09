import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { 
  FiUser, 
  FiSmartphone, 
  FiLock, 
  FiArrowRight, 
  FiLogIn,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password strength calculation
    if (name === 'password') {
      let score = 0;
      if (value.length >= 6) score += 30;
      if (value.length >= 8) score += 20;
      if (/[A-Z]/.test(value)) score += 20;
      if (/[0-9]/.test(value)) score += 20;
      if (/[^A-Za-z0-9]/.test(value)) score += 10;
      setPasswordScore(Math.min(score, 100));
    }
  };

  const validateForm = () => {
    if (formData.username.length < 3) {
      setMessage({ 
        text: 'Username must be at least 3 characters', 
        type: 'danger' 
      });
      return false;
    }

    if (formData.password.length < 6) {
      setMessage({ 
        text: 'Password must be at least 6 characters', 
        type: 'danger' 
      });
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setMessage({ 
        text: 'Please enter a valid 10-digit mobile number', 
        type: 'danger' 
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('https://lostfoundbackend-1a81.onrender.com/signup', formData);
      const token = res.data?.token;
      
      if (token) {
        localStorage.setItem('token', token);
        setMessage({ 
          text: 'Signup successful! Redirecting to login...', 
          type: 'success' 
        });
        
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Signup failed. Please try again.',
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordScore < 40) return 'danger';
    if (passwordScore < 70) return 'warning';
    return 'success';
  };

  return (
    <div className="signup-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <motion.div 
          className="signup-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="signup-header">
            <motion.div 
              className="signup-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ rotate: 10 }}
            >
              <FiUser />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join our community today
            </motion.p>
          </div>

          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert 
                  variant={message.type} 
                  className="alert-message"
                  onClose={() => setMessage({ text: '', type: '' })}
                  dismissible
                >
                  {message.type === 'success' ? (
                    <FiCheckCircle className="me-2" />
                  ) : (
                    <FiXCircle className="me-2" />
                  )}
                  {message.text}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Username</Form.Label>
              <div className="input-group">
                <span className="input-icon"><FiUser /></span>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="At least 3 characters"
                />
              </div>
              {formData.username.length > 0 && formData.username.length < 3 && (
                <div className="form-feedback text-danger">
                  Username too short
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3 form-group">
              <Form.Label>Mobile Number</Form.Label>
              <div className="input-group">
                <span className="input-icon"><FiSmartphone /></span>
                <Form.Control
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  placeholder="10-digit number"
                />
              </div>
              {formData.mobileNumber.length > 0 && !/^\d{10}$/.test(formData.mobileNumber) && (
                <div className="form-feedback text-danger">
                  Invalid mobile number
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3 form-group">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-icon"><FiLock /></span>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                />
              </div>
              {formData.password.length > 0 && (
                <>
                  <ProgressBar 
                    now={passwordScore} 
                    variant={getPasswordStrengthColor()}
                    className="password-strength-meter"
                    animated
                  />
                  <div className="password-requirements">
                    <div className={formData.password.length >= 6 ? 'text-success' : 'text-muted'}>
                      {formData.password.length >= 6 ? '✓' : '•'} At least 6 characters
                    </div>
                    <div className={formData.password.length >= 8 ? 'text-success' : 'text-muted'}>
                      {formData.password.length >= 8 ? '✓' : '•'} At least 8 characters
                    </div>
                    <div className={/[A-Z]/.test(formData.password) ? 'text-success' : 'text-muted'}>
                      {/[A-Z]/.test(formData.password) ? '✓' : '•'} Uppercase letter
                    </div>
                    <div className={/[0-9]/.test(formData.password) ? 'text-success' : 'text-muted'}>
                      {/[0-9]/.test(formData.password) ? '✓' : '•'} Number
                    </div>
                  </div>
                </>
              )}
            </Form.Group>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="primary" 
                type="submit" 
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <FiArrowRight className="ms-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </Form>

          <motion.div 
            className="signup-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-center">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                <FiLogIn className="me-1" />
                Login here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Signup;