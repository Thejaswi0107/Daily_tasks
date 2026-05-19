import React from "react";

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;