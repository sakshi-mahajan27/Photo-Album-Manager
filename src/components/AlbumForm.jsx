import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faTag, faFloppyDisk, faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

function AlbumForm({ onAddAlbum, onCancel, isSubmitting = false }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Album name cannot be empty. Please enter a valid name.');
      return;
    }

    setError('');
    onAddAlbum(trimmedName);
    setName('');
  };

  return (
    <div className="card shadow-sm border-0 mb-4 p-4 bg-white rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h5 className="fw-bold text-purple mb-0 d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faFolderPlus} />
          <span>Create New Album</span>
        </h5>
        {onCancel && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onCancel}
          ></button>
        )}
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center py-2 px-3 small mb-3 rounded-2" role="alert">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="albumName" className="form-label fw-semibold text-dark d-flex align-items-center gap-1">
            <FontAwesomeIcon icon={faTag} className="text-muted small" />
            <span>Album Name</span>
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
            id="albumName"
            placeholder="e.g., Summer Vacation 2026"
            value={name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            autoFocus
          />
          <div className="form-text text-muted">
            Enter a descriptive title for your photo collection.
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2">
          {onCancel && (
            <button
              type="button"
              className="btn btn-light px-4 fw-semibold d-inline-flex align-items-center gap-1"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faXmark} />
              <span>Cancel</span>
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary px-4 fw-semibold d-flex align-items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span>Save Album</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlbumForm;
