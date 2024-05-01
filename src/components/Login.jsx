import React, { useState } from 'react';
import { auth } from '../Firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);

      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials or try again later.');
      console.error(err);
    }

    setLoading(false);
  };

  const googleClick = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      navigate('/home');
    } catch (err) {
      setError('Google login failed. Please try again later.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container" style={{ width: '50%' }}>
      <h1 className="text-center">React Firebase Authentication</h1>

      <div className="container my-5">
        {error && <div className="alert alert-danger text-center">{error}</div>} {/* Display errors */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="text-center">
            <button
              style={{ width: '40%' }}
              type="submit"
              className="btn btn-primary"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 d-flex justify-content-center align-items-center">
          <button
            onClick={googleClick}
            className="btn d-flex justify-content-center align-items-center"
            style={{ backgroundColor: 'white', width: '72%' }}
            disabled={loading} // Disable Google login when loading
          >
            <div style={{ width: '12%' }}>
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                alt=""
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}
              >
                Login with Google
              </h2>
            </div>
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/register">
            <p style={{ color: 'white' }}>Register New User</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
