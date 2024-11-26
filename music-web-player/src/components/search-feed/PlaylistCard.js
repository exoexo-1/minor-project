import React from 'react';
import './PlaylistCard.css';

function PlaylistCard({ title, imageUrl, artists }) {
  return (
    <div className="playlist-card">
      <img src={imageUrl} alt={title} className="playlist-image" />
      <div className="playlist-info">
        <h3 className="playlist-title">{title}</h3>
        <p className="playlist-artists">{artists}</p>
      </div>
    </div>
  );
}

export default PlaylistCard;
