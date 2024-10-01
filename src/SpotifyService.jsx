
import axios from 'axios';

const SpotifyService = {
  fetchTracksByMood: async (mood, token) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_genres=${mood}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.tracks;
  },

  createMoodPlaylist: async (mood, tracks, token) => {
    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userId = userResponse.data.id;

    const playlistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: `Mood Playlist - ${mood}`,
        description: `A playlist for when you're feeling ${mood}`,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const trackUris = tracks.map((track) => track.uri);
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistResponse.data.id}/tracks`,
      { uris: trackUris },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return playlistResponse.data;
  }
};

export default SpotifyService;
