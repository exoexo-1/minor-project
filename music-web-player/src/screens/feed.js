import React from 'react';
import './feed.css';

export default function Feed() {
  const playlists = [
    { id: 1, name: "Top Hits", cover: "https://i.pinimg.com/736x/16/d4/33/16d433cb83c76d8828c30b188a0245e2.jpg" },
    { id: 2, name: "Chill Vibes", cover: "https://i.pinimg.com/236x/68/ae/47/68ae47c3685775706393e59429d41dc3.jpg" },
    { id: 3, name: "Workout Beats", cover: "https://i.pinimg.com/control2/236x/f3/01/bd/f301bdb58ffff7e947a4bdf32fccc3db.jpg" },
    { id: 4, name: "Romantic Classics", cover: "https://i.pinimg.com/236x/ab/1f/25/ab1f250de72460416f07f053b41ce9f8.jpg" },
    { id: 5, name: "Indie Essentials", cover: "https://i.pinimg.com/236x/2e/82/4a/2e824ac4c1f69288f2d89cb11b1cd428.jpg" },
    { id: 6, name: "Party Mix", cover: "https://i.pinimg.com/474x/1a/b0/5f/1ab05fd3e9dc63efbb87a5dc8df0fd08.jpg" },
    { id: 7, name: "Hip Hop Heat", cover: "https://i.pinimg.com/236x/89/11/71/89117133d3b31788a26ba5fdf0321655.jpg" },
    { id: 8, name: "Classic Rock", cover: "https://i.pinimg.com/control2/236x/d9/08/ec/d908ec7aa1d49ac1dd23969d4eff7d8f.jpg" },
    { id: 9, name: "Jazz Lounge", cover: "https://i.pinimg.com/control2/236x/d6/ce/f1/d6cef1782c5ada4a84ef56926d1ddaa4.jpg" },
    { id: 10, name: "Pop Paradise", cover: "https://i.pinimg.com/control2/236x/f0/5d/f4/f05df42baed1259594b50d7c9e665c18.jpg" },

  ];

  const handlePlaylistClick = (playlist) => {
    console.log(`Navigating to playlist: ${playlist.name}`);
    // Navigation logic here
  };

  return (
    <div className="screen-container feed">
      <h1>Discover Playlists</h1>
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist-card"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="playlist-image-container">
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="playlist-image"
              />
              <button className="play-button" title="Play Playlist">▶</button>
            </div>
            <div className="playlist-details">
              <h2>{playlist.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
