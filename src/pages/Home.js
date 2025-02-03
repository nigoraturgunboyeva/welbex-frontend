import React, { useState, useEffect } from 'react';
import PostForm from '../components/PostForm'; 
import PostList from '../components/PostList'; 
import api from '../services/api';
import Navbar from '../components/Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const addPostToList = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/all-posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/delete/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Post deleted successfully');
      fetchPosts(); 
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleEditPost = (postId) => {
    console.log(`Edit post with ID: ${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Navbar/>
    <h1>Blog</h1>
        <PostForm addPostToList={addPostToList} fetchPosts={fetchPosts} />
        <br/>
    <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
       <PostList
        posts={posts}
        userId={userId}
        fetchPosts={fetchPosts} 
        handleDeletePost={handleDeletePost}
        handleEditPost={handleEditPost}
      />
      </div>
  </div>
  );
};

export default Home;
