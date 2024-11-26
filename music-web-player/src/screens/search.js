import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Fetch recently played songs on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/songs/recently-played") // Example endpoint
      .then((response) => setRecentlyPlayed(response.data))
      .catch((error) =>
        console.error("Error fetching recently played songs:", error)
      );
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

          // Update recent searches
          if (!recentSearches.includes(searchTerm)) {
            setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 4)]);
          }
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
                      <button className="play-button" title="Play">
                        <i className="fas fa-play"></i>
                        <span className="hover-text">Play</span>
                      </button>
                      <button className="favorite-button" title="Favorite">
                        <i className="fas fa-heart"></i>
                        <span className="hover-text">Favorite</span>
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
                    <button className="play-button" title="Play">
                      <i className="fas fa-play"></i>
                      <span className="hover-text">Play</span>
                    </button>
                    <button className="favorite-button" title="Favorite">
                      <i className="fas fa-heart"></i>
                      <span className="hover-text">Favorite</span>
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
                <p
                  key={index}
                  className="recent-search-item"
                  onClick={() => setSearchTerm(search)}
                >
                  {search}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
