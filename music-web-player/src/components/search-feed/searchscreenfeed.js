import React, { useEffect, useState } from 'react';
import './searchscreenfeed.css';

export default function SearchScreenFeed() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/playlists');
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlists-container">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist">
          <h3>{playlist.genre}</h3>
          <div className="song-list">
            {playlist.songs.map((song) => (
              <div key={song.id} className="song-item">
                <p><strong>{song.title}</strong> - {song.artist}</p>
                <audio  src={`http://localhost:8080/files/${song.filePath}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
