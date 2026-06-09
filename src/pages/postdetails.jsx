
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Spinner, Card, Modal, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageRef = useRef(null);
  const Token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://lostfoundbackend-1a81.onrender.com/postbyid/${id}`, {
          headers: { Authorization: `Bearer ${Token}` },
        });
        setPost(res.data.post);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post details');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, Token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://lostfoundbackend-1a81.onrender.com/deletepost/${id}`, {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setShowDeleteModal(false);
      navigate('/posts', { state: { message: 'Post deleted successfully' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleEdit = () => {
    navigate(`/update-post/${id}`);
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    setZoomLevel(1); // Reset zoom when opening modal
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1; // Zoom in or out
    setZoomLevel((prev) => Math.max(1, Math.min(prev + delta, 3))); // Limit zoom: 1x to 3x
  };

  const handleTouchZoom = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        (touch2.clientX - touch1.clientX) ** 2 + (touch2.clientY - touch1.clientY) ** 2
      );
      // Simplified pinch zoom: adjust based on initial distance (requires state for pinch start)
      // For simplicity, we'll use a fixed zoom increment
      setZoomLevel((prev) => Math.max(1, Math.min(prev + (distance > 100 ? 0.1 : -0.1), 3)));
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" style={{ color: '#4a6fa5' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger" className="text-center animate__animated animate__fadeIn">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="warning" className="text-center animate__animated animate__fadeIn">
          No post found
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <style>
        {`
          :root {
            --primary-color: #4a6fa5;
            --secondary-color: #6b89c9;
          }
          .post-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            max-width: 800px;
            margin: 0 auto;
          }
          .post-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem;
            border-bottom: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #fff;
          }
          .user-avatar-placeholder {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--primary-color);
            border: 2px solid #fff;
          }
          .username {
            font-weight: 700;
            margin-bottom: 0.2rem;
          }
          .post-category {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: capitalize;
          }
          .post-category.Lost {
            background-color: #dc3545;
            color: white;
          }
          .post-category.Found {
            background-color: #198754;
            color: white;
          }
          .post-image-container {
            display: flex;
            justify-content: center;
            background-color: #f8fafc;
            cursor: pointer;
          }
          .post-image {
            max-height: 400px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .post-image:hover {
            transform: scale(1.05);
          }
          .post-image-placeholder {
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            color: #6c757d;
            background-color: #f8fafc;
          }
          .post-title {
            font-weight: 700;
            color: var(--primary-color);
          }
          .post-description {
            font-size: 1.1rem;
            color: #212529;
          }
          .post-meta {
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
          .post-meta strong {
            color: var(--primary-color);
          }
          .found-badge {
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 20px;
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
          .action-btn {
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            border: none;
            transition: all 0.3s ease;
            color: white;
          }
          .edit-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            box-shadow: 0 4px 15px rgba(74, 111, 165, 0.3);
          }
          .edit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(74, 111, 165, 0.4);
            color: white;
          }
          .delete-btn {
            background-color: #dc3545;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
          }
          .delete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
          }
          .image-preview-modal .modal-content {
            border-radius: 12px;
            overflow: hidden;
            background-color: #f8fafc;
          }
          .image-preview-modal .modal-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border-bottom: none;
          }
          .image-preview-container {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 80vh;
            overflow: auto;
            padding: 1rem;
          }
          .zoomable-image {
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            transition: transform 0.2s ease;
            cursor: zoom-in;
          }
          .zoom-controls {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            display: flex;
            gap: 0.5rem;
          }
          .zoom-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .zoom-btn:hover {
            background-color: var(--secondary-color);
            transform: scale(1.1);
          }
          @media (max-width: 768px) {
            .post-header {
              padding: 1.5rem;
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
            .post-image {
              max-height: 300px;
            }
            .image-preview-container {
              max-height: 70vh;
            }
          }
          @media (max-width: 576px) {
            .post-header {
              padding: 1.25rem;
            }
            .post-header h5 {
              font-size: 1.2rem;
            }
            .post-image {
              max-height: 250px;
            }
            .action-btn {
              width: 100%;
              justify-content: center;
            }
            .zoomable-image {
              max-height: 60vh;
            }
          }
        `}
      </style>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Button
            className="back-btn mb-4 animate__animated animate__fadeIn"
            onClick={() => navigate(-1)}
            aria-label="Back to posts"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Posts
          </Button>
          <Card className="post-card shadow-lg animate__animated animate__fadeIn">
            <Card.Header className="post-header">
              <div className="user-info">
                {post.userImage ? (
                  <img
                    src={`data:image/jpeg;base64,${post.userImage}`}
                    alt="User avatar"
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    <i className="bi bi-person"></i>
                  </div>
                )}
                <div>
                  <h5 className="username">{post.postedBy}</h5>
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <div>
                {post.category && (
                  <span className={`post-category ${post.category}`}>
                    {post.category}
                  </span>
                )}
                <Badge
                  bg={post.found ? 'success' : 'danger'}
                  className="found-badge ms-2"
                >
                  {post.found ? 'Found' : 'Not Found'}
                </Badge>
              </div>
            </Card.Header>
            <div className="post-image-container" onClick={post.imageUrl ? handleImageClick : null}>
              {post.imageUrl ? (
                <Card.Img
                  src={`data:image/jpeg;base64,${post.imageUrl}`}
                  alt="Post image"
                  className="post-image animate__animated animate__zoomIn"
                />
              ) : (
                <div className="post-image-placeholder">
                  No Image Available
                </div>
              )}
            </div>
            <Card.Body className="p-4">
              <Card.Title className="post-title">Item Details</Card.Title>
              <Card.Text className="post-description">{post.description}</Card.Text>
              {post.location && (
                <div className="post-meta">
                  <strong>Location:</strong> {post.location}
                </div>
              )}
              {post.itemType && (
                <div className="post-meta">
                  <strong>Item Type:</strong> {post.itemType}
                </div>
              )}
              <div className="d-flex gap-3 mt-4 post-actions">
                <Button
                  className="action-btn edit-btn"
                  onClick={handleEdit}
                  aria-label="Edit post"
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Post
                </Button>
                <Button
                  className="action-btn delete-btn"
                  onClick={() => setShowDeleteModal(true)}
                  aria-label="Delete post"
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Post
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
            className="animate__animated animate__fadeIn"
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this post? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Cancel deletion"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                aria-label="Confirm deletion"
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showImageModal}
            onHide={() => setShowImageModal(false)}
            centered
            dialogClassName="image-preview-modal"
            aria-labelledby="image-preview-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="image-preview-title">Image Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="image-preview-container"
                onWheel={handleZoom}
                onTouchMove={handleTouchZoom}
              >
                <img
                  ref={imageRef}
                  src={`data:image/jpeg;base64,${post.imageUrl}`}
                  alt="Post image preview"
                  className="zoomable-image"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>
              <div className="zoom-controls">
                <Button
                  className="zoom-btn"
                  onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.1))}
                  aria-label="Zoom out"
                >
                  <i className="bi bi-zoom-out"></i>
                </Button>
                <Button
                  className="zoom-btn"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 3))}
                  aria-label="Zoom in"
                >
                  <i className="bi bi-zoom-in"></i>
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default PostDetail;
