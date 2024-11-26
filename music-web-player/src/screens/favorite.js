import React from 'react';
import './favorite.css';

export default function Favorite() {
  const songs = [
    {
      id: 1,
      title: 'Not Like Us',
      artist: 'Kendrick Lamar',
      album: 'Not Like Us',
      dateAdded: '6 days ago',
      duration: '4:34',
    },
    {
      id: 2,
      title: 'Itna Na Mujhse Tu Pyar Badha',
      artist: 'Talat Mahmood, Lata Mangeshkar',
      album: 'Chhaya',
      dateAdded: '1 week ago',
      duration: '3:55',
    },
    // Add more song objects here as placeholders
  ];

  return (
    <div className="screen-container">
      <div className="favorite-header">
        <button className="play-all-btn">▶</button>
        <h1>Your Favorites</h1>
      </div>
      <table className="song-list">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song.id}>
              <td>{index + 1}</td>
              <td>
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </td>
              <td>{song.album}</td>
              <td>{song.dateAdded}</td>
              <td>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
