import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/userActions';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // Retrieve saved login info from localStorage
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setSaveLoginInfo(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // Save login info to localStorage if checkbox is checked
    if (saveLoginInfo) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      <form onSubmit={submitHandler} className="login-form">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group-inline">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
        <div className="form-group-inline">
          <input
            type="checkbox"
            checked={saveLoginInfo}
            onChange={() => setSaveLoginInfo(!saveLoginInfo)}
          />
          <label>Save Login Info</label>
        </div>
        <button type="submit" className="btn-submit">Sign In</button>
      </form>
      <div>
        New Customer? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;