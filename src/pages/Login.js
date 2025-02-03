import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true); 
    try {
      const { data } = await api.post('/auth/signin', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.data._id);
      history('/');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="form-group my-2">
          <input
            type="password"
            className={`form-control ${error ? 'is-invalid' : ''}`}
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
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
