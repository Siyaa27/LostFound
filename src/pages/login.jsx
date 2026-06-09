import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FiLogIn, FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await axios.post('https://6a27bc97c4fd7e95c57f424b--lostandfound27.netlify.app/login', formData);
      const Token = res.data.Token;

      localStorage.setItem('Token', Token);

      setMessage({ 
        text: 'Login successful! Redirecting...', 
        type: 'success' 
      });
      
      setTimeout(() => {
        navigate('/posts');
      }, 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Login failed. Please try again.',
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header">
            <motion.div 
              className="login-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FiLogIn />
            </motion.div>
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to login</p>
          </div>

          {message.text && (
            <Alert variant={message.type} className="alert-message">
              {message.text}
            </Alert>
          )}

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
                  placeholder="Enter your username"
                />
              </div>
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
                  placeholder="Enter your password"
                />
              </div>
            </Form.Group>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="primary" 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
                <FiArrowRight className="ms-2" />
              </Button>
            </motion.div>
          </Form>

          <div className="login-footer">
            <p className="text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;