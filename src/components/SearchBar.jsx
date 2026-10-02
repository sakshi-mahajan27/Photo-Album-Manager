import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ searchTerm, onSearchChange, placeholder = 'Search photos by title...' }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden border">
        <span className="input-group-text bg-white border-0 text-muted ps-3 pe-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className="form-control border-0 bg-white ps-1 shadow-none fs-6"
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
            aria-label="Clear Search"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

