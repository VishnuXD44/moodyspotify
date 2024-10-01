// src/App.jsx
import React, { useState } from 'react';
import SpotifyAuth from './SpotifyAuth'; // Import the Spotify authentication component
import SpotifyService from './SpotifyService'; // Spotify API handling service
import './App.css'; // App-wide CSS styling

const App = () => {
  const [token, setToken] = useState(null);  // Store the auth token
  const [mood, setMood] = useState('');  // Store the user's mood
  const [musicType, setMusicType] = useState('');  // Store the user's music type preference
  const [playlist, setPlaylist] = useState(null);  // Store created playlist details

  // Map user mood and music type to genres
  const moodMusicTypeToGenreMap = {
    happy: {
      calm: 'acoustic',
      energetic: 'pop',
      upbeat: 'dance',
    },
    sad: {
      calm: 'classical',
      energetic: 'rock',
      upbeat: 'alternative',
    },
    relaxed: {
      calm: 'ambient',
      energetic: 'chill',
      upbeat: 'jazz',
    },
    energetic: {
      calm: 'chill',
      energetic: 'electronic',
      upbeat: 'hip-hop',
    },
  };

  // Handle playlist creation based on mood and music type
  const handlePlaylistCreation = async () => {
    if (!token) {
      alert("Session has expired. Please log in again.");
      return;
    }

    if (mood && musicType) {
      const genre = moodMusicTypeToGenreMap[mood]?.[musicType];  // Get the genre based on mood and music type
      if (genre) {
        try {
          const tracks = await SpotifyService.fetchTracksByMood(genre, token);
          const playlistData = await SpotifyService.createMoodPlaylist(`${mood} and ${musicType}`, tracks, token);
          setPlaylist(playlistData);  // Store the playlist details for display
        } catch (error) {
          console.error('Error creating playlist:', error);
        }
      } else {
        console.log('No valid genre found for the selected mood and music type');
      }
    } else {
      console.log('Please select both mood and type of music');
    }
  };

  return (
    <div className="App">
      {!token ? (
        <SpotifyAuth setToken={setToken} />  // Pass the setToken function to SpotifyAuth
      ) : (
        <div className="playlist-page">
          <h2>Create Your Mood-based Playlist</h2>

          <div className="input-group">
            <label htmlFor="mood">How are you feeling?</label>
            <select id="mood" value={mood} onChange={e => setMood(e.target.value)}>
              <option value="">Select a Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="relaxed">Relaxed</option>
              <option value="energetic">Energetic</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="musicType">What type of music would you like to listen to?</label>
            <select id="musicType" value={musicType} onChange={e => setMusicType(e.target.value)}>
              <option value="">Select a Music Type</option>
              <option value="calm">Calm</option>
              <option value="energetic">Energetic</option>
              <option value="upbeat">Upbeat</option>
            </select>
          </div>

          <button className="create-playlist-button" onClick={handlePlaylistCreation}>
            Create Playlist
          </button>

          {/* Show created playlist details */}
          {playlist && (
            <div className="playlist-details">
              <h3>Playlist Created: {playlist.name}</h3>
              <p>
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Open Playlist on Spotify
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
