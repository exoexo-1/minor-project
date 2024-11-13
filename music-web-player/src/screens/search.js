import React, { useState } from 'react';
import './search.css';
import Searchscreenfeed from '../components/search-feed/searchscreenfeed';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='screen-container'>
      <div className='screen-Container'>
        <div className='search-button'>
          <input
            type="text"
            placeholder="Search for songs or artists"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results-container">
          {results.map((song) => (
            <div key={song.id} className="result-item">
              <p><strong>Title:</strong> {song.title}</p>
              <p><strong>Duration:</strong> {song.duration}</p>
              <audio controls src={`http://localhost:8080/files/${song.filePath}`} />
            </div>
          ))}
        </div>
      
    <div className='search-feed'>
      <Searchscreenfeed />
      <Searchscreenfeed />
      <Searchscreenfeed />

    </div>
    </div>
    </div>
  );
}
