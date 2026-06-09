
import React, { useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const Home = () => {
  const navigate = useNavigate();
  const loginRef = useRef(null);

  const handleGetStartedClick = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .home-wrapper {
            background-color: #f8fafc;
          }
          .hero-section {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            color: white;
            padding: 2rem;
          }
          .hero-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
          }
          .hero-title {
            font-weight: 700;
            font-size: 3rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .hero-subtitle {
            font-size: 1.5rem;
            opacity: 0.9;
          }
          .hero-button {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
            transition: all 0.3s ease;
            color: white;
          }
          .hero-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
            color: white;
          }
          .hero-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.3;
          }
          .shape-circle {
            position: absolute;
            top: 20%;
            left: 10%;
            width: 150px;
            height: 150px;
            background-color: #fff;
            border-radius: 50%;
          }
          .shape-triangle {
            position: absolute;
            bottom: 20%;
            right: 15%;
            width: 0;
            height: 0;
            border-left: 75px solid transparent;
            border-right: 75px solid transparent;
            border-bottom: 130px solid #fff;
          }
          .features-section {
            padding: 5rem 0;
            background-color: #fff;
          }
          .section-title {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 2.5rem;
          }
          .feature-card {
            border: none;
            border-radius: 12px;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.2);
          }
          .feature-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          .feature-title {
            font-weight: 600;
            color: var(--primary-color);
            font-size: 1.25rem;
          }
          .feature-desc {
            color: #212529;
            font-size: 1rem;
          }
          .cta-section {
            padding: 5rem 0;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
          }
          .cta-title {
            font-weight: 700;
            font-size: 2rem;
          }
          .cta-subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
          }
          .cta-button {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            background: linear-gradient(135deg, #198754, #28a745);
            border: none;
            box-shadow: 0 4px 15px rgba(25, 135, 84, 0.3);
            transition: all 0.3s ease;
            color: white;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(25, 135, 84, 0.4);
            color: white;
          }
          @media (max-width: 768px) {
            .hero-section {
              min-height: 80vh;
              padding: 1.5rem;
            }
            .hero-title {
              font-size: 2.5rem;
            }
            .hero-subtitle {
              font-size: 1.25rem;
            }
            .section-title {
              font-size: 2rem;
            }
            .feature-card {
              padding: 1.5rem;
            }
            .cta-title {
              font-size: 1.75rem;
            }
            .cta-subtitle {
              font-size: 1.1rem;
            }
          }
          @media (max-width: 576px) {
            .hero-section {
              min-height: 70vh;
              padding: 1rem;
            }
            .hero-title {
              font-size: 2rem;
            }
            .hero-subtitle {
              font-size: 1rem;
            }
            .hero-button, .cta-button {
              width: 100%;
              padding: 0.75rem;
            }
            .section-title {
              font-size: 1.75rem;
            }
            .feature-icon {
              font-size: 2rem;
            }
            .cta-title {
              font-size: 1.5rem;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center animate__animated animate__fadeIn">
        <div className="hero-content">
          <h1 className="hero-title animate__animated animate__fadeInDown">Rediscover What Matters</h1>
          <p className="hero-subtitle animate__animated animate__fadeInUp">
            Lost something? Found something? We're here to connect the dots.
          </p>
          <Button
            className="hero-button animate__animated animate__zoomIn"
            onClick={handleGetStartedClick}
            aria-label="Get started by scrolling to login section"
          >
            Get Started
          </Button>
        </div>
        <div className="hero-shapes">
          <div className="shape-circle animate__animated animate__pulse animate__infinite" />
          <div className="shape-triangle animate__animated animate__rotateIn animate__infinite animate__slower" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5 animate__animated animate__fadeIn">
            Why Choose Us?
          </h2>
          <Row className="g-4">
            {[
              {
                icon: <i className="bi bi-phone feature-icon"></i>,
                title: 'Effortless Reporting',
                desc: 'Log found or lost items with just a few clicks, including images and details.',
              },
              {
                icon: <i className="bi bi-lock feature-icon"></i>,
                title: 'Trusted by All',
                desc: 'User identities are protected and verified. Security is our top priority.',
              },
              {
                icon: <i className="bi bi-bell feature-icon"></i>,
                title: 'Smart Notifications',
                desc: 'Get real-time alerts when a match is found for your lost item.',
              },
            ].map((item, index) => (
              <Col md={4} key={index}>
                <Card className="feature-card h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card.Body className="text-center">
                    {item.icon}
                    <h4 className="feature-title mt-3">{item.title}</h4>
                    <p className="feature-desc">{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 text-center" ref={loginRef}>
        <Container>
          <h2 className="cta-title animate__animated animate__fadeIn">
            Join the Lost & Found Movement
          </h2>
          <p className="cta-subtitle animate__animated animate__fadeInUp">
            Together, we can bring items back to their rightful owners.
          </p>
          <Button
            className="cta-button animate__animated animate__zoomIn"
            onClick={() => navigate('/login')}
            aria-label="Navigate to login page"
          >
            Login to Report
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
