import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyItems = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("https://lostfoundbackend-1a81.onrender.com/mypost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPosts(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">📌 My Posts</h2>

      {/* Style inside JSX */}
      <style>{`
        .custom-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .custom-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(255, 140, 0, 0.25);
          background-color: #fffaf0;
        }
        .custom-card-img {
          height: 200px;
          object-fit: cover;
          width: 100%;
          transition: transform 0.3s ease-in-out;
        }
        .custom-card:hover .custom-card-img {
          transform: scale(1.05);
        }
      `}</style>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : myPosts.length === 0 ? (
        <p className="text-center text-muted">No posts found.</p>
      ) : (
        <Row>
          {myPosts.map((post) => (
            <Col md={4} sm={6} xs={12} key={post._id} className="mb-4">
              <Link
                to={`/post/${post._id}`}
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 custom-card">
                  <div style={{ overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={
                        post.imageUrl
                          ? `data:image/jpeg;base64,${post.imageUrl}`
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt="Post"
                      className="custom-card-img"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      {post.title || "Untitled Post"}
                    </Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-light text-muted small">
                    Posted by <strong>{post.postedBy}</strong> on{" "}
                    {formatDate(post.postedAt)}
                  </Card.Footer>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyItems;
