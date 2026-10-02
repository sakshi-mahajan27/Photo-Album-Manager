import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFolderOpen, faTrash, faCalendarDays, faFolder, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
            <span className="badge bg-purple-subtle text-purple border border-purple-subtle rounded-pill px-3 py-2 fs-6 d-inline-flex align-items-center gap-1">
              <FontAwesomeIcon icon={faImage} />
              <span>{photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}</span>
            </span>
          </div>

          <h5 className="card-title fw-bold text-dark mb-2 text-truncate d-flex align-items-center" title={album.name}>
            <FontAwesomeIcon icon={faFolder} className="me-2 text-muted opacity-75 fs-5" />
            <span className="text-truncate">{album.name}</span>
          </h5>

          <p className="card-text text-muted small mb-4 d-flex align-items-center gap-1">
            <FontAwesomeIcon icon={faCalendarDays} className="text-muted" />
            <span>Created: {album.createdAt ? new Date(album.createdAt).toLocaleDateString() : 'Recently'}</span>
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
            <Link to={`/albums/${album.id}`} className="btn btn-outline-primary btn-sm px-3 fw-semibold d-inline-flex align-items-center gap-1">
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>Open Album</span>
              <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
            </Link>

            <button
              onClick={handleDeleteClick}
              className="btn btn-outline-danger btn-sm px-3 fw-semibold d-inline-flex align-items-center gap-1"
              title="Delete Album"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
