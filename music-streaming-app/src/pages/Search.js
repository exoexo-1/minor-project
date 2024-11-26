import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="content">
      <input 
        type="text" 
        placeholder="Search for songs, artists..." 
        value={searchTerm}
        onChange={handleSearch} 
      />
    </div>
  );
}

export default Search;
