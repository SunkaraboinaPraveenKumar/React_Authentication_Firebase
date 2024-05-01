import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Ensure user is defined and set to state
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      // Redirect if no user is logged in
      navigate('/');
    }
  }, [auth, navigate]);

  const logOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <>
      <div className="container text-center">
        <h1>Welcome to the Home Page...</h1>

        {user ? (
          <div className="my-5">
            <h1>{user.displayName || 'User'}</h1>
            <h2>{user.email}</h2>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile picture" style={{ maxWidth: '200px' }} />
            ) : (
              <p>No profile picture available.</p>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button className="btn btn-warning" onClick={logOut}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Home;
