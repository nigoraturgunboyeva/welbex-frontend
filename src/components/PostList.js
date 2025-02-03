import React, { useState } from 'react';
import api from '../services/api';

const PostList = ({ posts, userId, handleDeletePost, fetchPosts }) => {
  const [editPostId, setEditPostId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImg, setEditedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString('en-US', options);
  };

  const handleEditPost = (postId, description, image) => {
    setEditPostId(postId);
    setEditedDescription(description);
    setEditedImg(image); 
    setIsEditing(true);
  };
  const handleSaveEdit = async (postId) => {
    const formData = new FormData();
    formData.append('description', editedDescription);
  
    if (editedImg) {
      formData.append('image', editedImg); 
    }
  
    try {
      await api.put(`/posts/update/${postId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      // Reset edit state after saving
      setEditPostId(null);
      setEditedDescription('');
      setEditedImg(null); 
      setIsEditing(false);
      fetchPosts();
  
      // Fetch posts again to update the list
    } catch (error) {
      console.error('Error updating post', error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditPostId(null);
    setEditedDescription('');
    setEditedImg(null);
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card my-2">
            <div className="card-body">
              {editPostId === post._id ? (
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />

                  <input
                  type="file"
                  className="form-control my-2"
                  onChange={(e) => {
                    const file = e.target.files[0]; 
                    setEditedImg(file); 
                  }}
                />

                 {editedImg && editedImg instanceof File && (
                <div>
                  <p>Selected image: {editedImg.name}</p>
                  <img src={URL.createObjectURL(editedImg)} alt="Preview" width="100" />
                </div>
              )}
                  <button
                    onClick={() => handleSaveEdit(post._id)}
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn-secondary btn-sm ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>{post.description}</p>
                  {post.img && (
                    <img
                      src={`${api}/uploads/${post.img}`}
                      alt="Post"
                      width="100"
                    />
                  )}
                  <p className="text-muted small">
                    Posted on {formatDate(post.createdAt)}
                  </p>
                </div>
              )}
              {post.author === userId && !isEditing && (
                <div>
                  <button
                    onClick={() => handleEditPost(post._id, post.description, post.img)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default PostList;