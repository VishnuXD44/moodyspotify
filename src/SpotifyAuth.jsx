// src/SpotifyAuth.jsx
import React, { useEffect } from 'react';

// Spotify Authentication Component
const SpotifyAuth = ({ setToken }) => {
  useEffect(() => {
    // Extract token from URL hash and store it
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.location.hash = ''; // Remove token from URL
      window.localStorage.setItem('token', token); // Store token in localStorage
      setToken(token); // Set the token in the parent component's state
    } else if (token) {
      setToken(token); // Use token from localStorage
    }
  }, [setToken]);

  // Function to trigger Spotify login
  const handleLogin = () => {
    const CLIENT_ID = '29624c672b104ec4b904ff064c8e8dc6'; 
    const REDIRECT_URI = 'https://9000-idx-moodyspotify-1727408005462.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev/callback'; 
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'; 
    const RESPONSE_TYPE = 'token';

    // Redirect the user to Spotify's login page
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-library-read playlist-modify-public`;
  };

  return (
    <div className="spotify-auth">
      <button className="login-button" onClick={handleLogin}>
        Login with Spotify
      </button>
    </div>
  );
};

export default SpotifyAuth;
