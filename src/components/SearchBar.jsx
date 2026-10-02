import React from 'react';

function SearchBar({ searchTerm, onSearchChange, placeholder = 'Search photos by title...' }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden border">
        <input
          type="text"
          className="form-control border-0 bg-white ps-2 shadow-none fs-6"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="btn btn-white border-0 text-muted px-3"
            type="button"
            onClick={() => onSearchChange('')}
            title="Clear Search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
