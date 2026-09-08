import React, { useState } from 'react';

function AlbumForm({ onAddAlbum, onCancel }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Album name cannot be empty.');
      return;
    }

    setError('');
    onAddAlbum(trimmedName);
    setName('');
  };

  return (
    <div className="card shadow-sm border-0 mb-4 p-4 bg-white rounded-3">
      <h5 className="fw-bold text-primary mb-3">Create New Album</h5>

      {error && (
        <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="albumName" className="form-label fw-semibold text-dark">
            Album Name
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="albumName"
            placeholder="e.g., Summer Vacation 2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          {onCancel && (
            <button
              type="button"
              className="btn btn-light px-4 fw-semibold"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary px-4 fw-semibold">
            Create Album
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlbumForm;
