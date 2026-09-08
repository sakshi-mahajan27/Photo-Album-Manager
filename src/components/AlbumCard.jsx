import React from 'react';
import { Link } from 'react-router-dom';

function AlbumCard({ album, photoCount = 0, onDelete }) {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${album.name}" and all its photos?`)) {
      onDelete(album.id);
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0 position-relative">
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className="badge bg-purple-subtle text-purple border border-purple-subtle rounded-pill px-3 py-2 fs-6">
              {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
            </span>
          </div>

          <h5 className="card-title fw-bold text-dark mb-2 text-truncate" title={album.name}>
            {album.name}
          </h5>

          <p className="card-text text-muted small mb-4">
            Created: {album.createdAt ? new Date(album.createdAt).toLocaleDateString() : 'Recently'}
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
            <Link to={`/albums/${album.id}`} className="btn btn-outline-primary btn-sm px-3 fw-semibold">
              Open Album &rarr;
            </Link>

            <button
              onClick={handleDeleteClick}
              className="btn btn-outline-danger btn-sm px-3 fw-semibold"
              title="Delete Album"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
