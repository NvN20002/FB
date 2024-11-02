import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
    });

    const [posts, setPosts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() === '' || formData.content.trim() === '') {
            alert('Title and content are required!');
            return;
        }

        let newPosts;
        if (editIndex !== null) {
            newPosts = posts.map((post, index) => (index === editIndex ? { ...formData } : post));
            setEditIndex(null);
        } else {
            newPosts = [{ ...formData }, ...posts];
        }

        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
        setFormData({ title: '', content: '', image: null });
    };

    const handleEdit = (index) => {
        setFormData(posts[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const newPosts = posts.filter((_, i) => i !== index);
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
    };

    const handleLogout = () => {
        localStorage.removeItem('posts');
        alert('You have logged out successfully.');
        onLogout(); // Call the logout function passed from App.js
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="landing-page">
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Post Content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <div className="file-input-container">
                    <input
                        type="file"
                        id="file-input"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input" className="browse-button">
                        Browse
                    </label>
                </div>
                <span className="file-status">
                    {formData.image ? formData.image.name : 'No files selected'}
                </span>
                <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
            </form>
            <div className="post-list">
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        {post.image && (
                            <img
                                src={URL.createObjectURL(post.image)}
                                alt="Post"
                            />
                        )}
                        <div className="post-buttons">
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
