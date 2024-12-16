import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]); // To store last 5 searched songs
  const [recentlyPlayed, setRecentlyPlayed] = useState([]); // To store recently played songs
  const navigate = useNavigate(); // Initialize navigate

  // Fetch recently played songs on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/songs/recently-played")
      .then((response) => setRecentlyPlayed(response.data))
      .catch((error) => console.error("Error fetching recently played songs:", error));
  }, []);

  // Fetch recent searches from backend or localStorage
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/songs/recent-searches") // This should return the last 5 searched songs
      .then((response) => setRecentSearches(response.data))
      .catch((error) => console.error("Error fetching recent searches:", error));
  }, []);

  // Fetch search results dynamically as search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
    } else {
      axios
        .get(`http://localhost:8080/api/songs/search?query=${searchTerm}`)
        .then((response) => {
          setResults(response.data);

          // Optionally, send the search term to backend to update recent searches
          axios.post("http://localhost:8080/api/songs/add-recent-search", { query: searchTerm })
            .catch((error) => console.error("Error adding recent search:", error));
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [searchTerm]); // Only trigger when searchTerm changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle play button click
  const handlePlayClick = (song) => {
    navigate("/library", { state: { song } }); // Pass song to Library page
  };

  // Handle like button click to toggle the favorite status
  const handleLikeClick = (song) => {
    const newFavoriteStatus = song.favorite === 1 ? 0 : 1;
    
    // Optimistically update UI (optional, can be done after backend confirmation)
    const updatedResults = results.map((s) =>
      s.songId === song.songId ? { ...s, favorite: newFavoriteStatus } : s
    );
    setResults(updatedResults);

    // Update the favorite status in the database (backend work will be done later)
    axios
      .post("http://localhost:8080/api/songs/toggle-favorite", { songId: song.songId, favorite: newFavoriteStatus })
      .catch((error) => console.error("Error updating favorite status:", error));
  };

  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
  };

  return (
    <div className="screen-container">
      <div className="search-page">
        <div className="search-section">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for songs or artists"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Show recently played songs when search bar is empty */}
          {!searchTerm.trim() && (
            <div className="recently-played">
              <h2>Recently Played</h2>
              <div className="search-results-scrollable">
                {recentlyPlayed.map((song) => (
                  <div className="result-item" key={song.songId}>
                    <div className="song-details">
                      <p><strong>Title:</strong> {song.title}</p>
                      <p><strong>Artist:</strong> {song.artist}</p>
                    </div>
                    <div className="song-actions">
                      <button
                        className="play-button"
                        title="Play"
                        onClick={() => handlePlayClick(song)}
                      >
                        <i className="fas fa-play"></i>
                        <span className="hover-text">Play</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show search results dynamically */}
          {searchTerm.trim() && results.length > 0 && (
            <div className="search-results-scrollable">
              {results.map((song) => (
                <div className="result-item" key={song.songId}>
                  <div className="song-details">
                    <p><strong>Title:</strong> {song.title}</p>
                    <p><strong>Artist:</strong> {song.artist}</p>
                  </div>
                  <div className="song-actions">
                    <button
                      className="play-button"
                      title="Play"
                      onClick={() => handlePlayClick(song)}
                    >
                      <i className="fas fa-play"></i>
                      <span className="hover-text">Play</span>
                    </button>
                    {/* Like button */}
                    <button
                      className={`like-button ${song.favorite === 1 ? 'liked' : ''}`}
                      title="Like"
                      onClick={() => handleLikeClick(song)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show "No Results Found" when search term has no matches */}
          {searchTerm.trim() && results.length === 0 && (
            <p className="no-results">No results found.</p>
          )}

          {/* Show recent searches when search bar is empty */}
          {!searchTerm.trim() && recentSearches.length > 0 && (
            <div className="recent-searches">
              <h2>Recent Searches</h2>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="recent-search-item"
                  onClick={() => handleRecentSearchClick(search.query)}
                >
                  <p><strong>Search:</strong> {search.query}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
