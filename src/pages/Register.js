import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);  
    setError('');     

    try {
      const { data } = await api.post('/auth/signup', { username, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      navigate('/'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);  
      } else {
        setError('Something went wrong. Please try again.');  
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`} 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}  
        </div>
        <div className="form-group">
          <input
            type="email"
            className={`form-control my-2 ${error ? 'is-invalid' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}  
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control my-2 ${error ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}  
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}  
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Register'
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
