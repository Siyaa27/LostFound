import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { FiSearch, FiPlusCircle, FiUser, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Post.css';

const ShowPost = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchPosts = async () => {
            const Token = localStorage.getItem('Token');

            if (!Token) {
                setError('No token found. Please login.');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:3000/showpost', {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                });

                setPosts(res.data || []);
                setFilteredPosts(res.data || []);
            } catch (err) {
                if (err.response?.status === 401) {
                    setError('Unauthorized. Invalid or expired token.');
                } else {
                    setError('Failed to fetch posts. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Filter posts based on search term and category
    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const results = posts.filter(post => {
            const matchesSearch = 
                post.postedBy.toLowerCase().includes(lowerSearch) ||
                post.description.toLowerCase().includes(lowerSearch);
            
            const matchesCategory = 
                selectedCategory === 'all' || 
                (post.category && post.category.toLowerCase() === selectedCategory);
            
            return matchesSearch && matchesCategory;
        });
        setFilteredPosts(results);
    }, [searchTerm, posts, selectedCategory]);

    return (
        <Container className="show-post-page py-5">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-center mb-4 section-title">
                    Lost and Found Posts
                </h2>

                <div className="filter-controls mb-4">
                    <div className="search-box">
                        <FiSearch className="search-icon" />
                        <Form.Control
                            type="text"
                            placeholder="Search by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filter">
                        <Form.Select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-select"
                        >
                            <option value="all">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="documents">Documents</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="clothing">Clothing</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            as={Link} 
                            to="/create-post" 
                            variant="primary" 
                            className="create-post-btn"
                        >
                            <FiPlusCircle className="me-2" />
                            Create New Post
                        </Button>
                    </motion.div>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3">Loading posts...</p>
                    </div>
                )}

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Alert variant="danger" className="text-center">
                                <FiAlertTriangle className="me-2" />
                                {error}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!loading && filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5"
                    >
                        <FiInfo size={48} className="text-muted mb-3" />
                        <h4>No posts found</h4>
                        <p className="text-muted">
                            {searchTerm || selectedCategory !== 'all' 
                                ? "Try adjusting your search or filter criteria" 
                                : "There are currently no posts available"}
                        </p>
                    </motion.div>
                )}

                <Row className="g-4 posts-grid">
                    <AnimatePresence>
                        {filteredPosts.map((post) => (
                            <Col key={post._id} xs={12} sm={6} lg={4}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Link to={`/post/${post._id}`} className="post-card-link">
                                        <Card className="post-card h-100">
                                            <div className="card-header">
                                                <div className="user-info">
                                                    {post.userImage ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${post.userImage}`}
                                                            alt="User"
                                                            className="user-avatar"
                                                        />
                                                    ) : (
                                                        <div className="user-avatar-placeholder">
                                                            <FiUser />
                                                        </div>
                                                    )}
                                                    <span className="username">{post.postedBy}</span>
                                                </div>
                                                {post.category && (
                                                    <span className={`post-category ${post.category}`}>
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="post-image-container">
                                                {post.imageUrl ? (
                                                    <Card.Img
                                                        variant="top"
                                                        src={`data:image/jpeg;base64,${post.imageUrl}`}
                                                        className="post-image"
                                                    />
                                                ) : (
                                                    <div className="post-image-placeholder">
                                                        No Image Available
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <Card.Body>
                                                <Card.Text className="post-description">
                                                    {post.description.length > 100
                                                        ? `${post.description.slice(0, 100)}...`
                                                        : post.description}
                                                </Card.Text>
                                            </Card.Body>
                                            
                                            <Card.Footer className="post-footer">
                                                <small className="text-muted">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </small>
                                            </Card.Footer>
                                        </Card>
                                    </Link>
                                </motion.div>
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>
            </motion.div>
        </Container>
    );
};

export default ShowPost;