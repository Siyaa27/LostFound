
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ text: "Failed to load profile data.", type: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/profile/change-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: res.data.message, type: "success" });
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to change password",
        type: "danger",
      });
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .profile-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            max-width: 500px;
            width: 100%;
          }
          .profile-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem;
            border-bottom: none;
          }
          .profile-header h3 {
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .profile-info {
            font-size: 1.1rem;
          }
          .profile-info strong {
            color: var(--primary-color);
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            color: var(--primary-color);
            font-size: 1.2rem;
          }
          .password-input .form-control {
            padding-left: 45px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
            font-size: 1rem;
          }
          .password-input .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(74, 111, 165, 0.2);
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
          @media (max-width: 576px) {
            .profile-header {
              padding: 1.25rem;
            }
            .profile-header h3 {
              font-size: 1.5rem;
            }
            .submit-btn {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" style={{ color: "#4a6fa5" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : user ? (
        <Card className="profile-card shadow-lg animate__animated animate__fadeIn">
          <div className="profile-header">
            <h3 className="mb-0">👤 My Profile</h3>
            <p>Manage your account details</p>
          </div>
          <Card.Body className="p-4">
            <Button
              className="back-btn mb-3"
              onClick={() => navigate("/posts")}
              aria-label="Back to posts"
            >
              <i className="bi bi-arrow-left me-2"></i>Back
            </Button>
            {message.text && (
              <Alert
                variant={message.type}
                className="animate__animated animate__fadeInDown"
                dismissible
                onClose={() => setMessage({ text: "", type: "" })}
              >
                {message.text}
              </Alert>
            )}
            <div className="profile-info mb-4">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Mobile:</strong> {user.mobileNumber}
              </p>
            </div>
            <hr />
            <h5 className="mb-3">Change Password</h5>
            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3 password-input position-relative">
                <Form.Label htmlFor="oldPassword">Old Password</Form.Label>
                <i className="bi bi-lock input-icon"></i>
                <Form.Control
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  required
                  aria-describedby="oldPasswordHelp"
                  placeholder="Enter current password"
                />
                <Form.Text id="oldPasswordHelp" muted>
                  Enter your current password.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 password-input position-relative">
                <Form.Label htmlFor="newPassword">New Password</Form.Label>
                <i className="bi bi-lock-fill input-icon"></i>
                <Form.Control
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                  aria-describedby="newPasswordHelp"
                  placeholder="Enter new password"
                />
                <Form.Text id="newPasswordHelp" muted>
                  Choose a strong new password.
                </Form.Text>
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="submit-btn">
                  Update Password
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger" className="animate__animated animate__fadeIn">
          Unable to load profile data.
        </Alert>
      )}
    </Container>
  );
};

export default Profile;