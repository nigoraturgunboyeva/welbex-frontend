import React, { useState } from 'react';
import api from '../services/api';

const PostForm = ({ addPostToList, fetchPosts }) => {
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!description) {
      setError('Both description and image are required.');
      return; 
    }
    setError('');
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', img);
    setLoading(true);
    try {
      const response = await api.post('/posts/create', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      addPostToList(response.data);

      fetchPosts();

      setDescription('');
      setImg('');
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post', error);
      setError('Error creating post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreatePost}>
      <div>
        <input
          type="text"
          className={`form-control ${error && !description ? 'is-invalid' : ''}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Post description"
        />
        {error && !description && <div className="invalid-feedback">{error}</div>}
      </div>
      <div>
        <input
          type="file"
          className="form-control my-2"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* {error && !img && <div className="invalid-feedback">{error}</div>} */}
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Loading...' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
