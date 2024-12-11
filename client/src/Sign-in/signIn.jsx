import React, { useState } from 'react';
import "./signIn.css";

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_BASE_URL

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Welcome, ${data.username}!`);
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="sign-in-page">
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        {message && <p>{message}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
