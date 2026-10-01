import React, { useState } from 'react';

function PhotoForm({ onAddPhoto, onCancel, isSubmitting = false }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedUrl = imageUrl.trim();

    if (!trimmedTitle) {
      setError('Photo title cannot be empty.');
      return;
    }

    if (!trimmedUrl) {
      setError('Image URL cannot be empty.');
      return;
    }

    setError('');
    onAddPhoto({ title: trimmedTitle, imageUrl: trimmedUrl });
    setTitle('');
    setImageUrl('');
  };

  return (
    <div className="card shadow-sm border-0 mb-4 p-4 bg-white rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h5 className="fw-bold text-primary mb-0">Add New Photo</h5>
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
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="photoTitle" className="form-label fw-semibold text-dark">
            Photo Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="photoTitle"
            placeholder="e.g., Sunset over Mountains"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label fw-semibold text-dark">
            Image URL <span className="text-danger">*</span>
          </label>
          <input
            type="url"
            className="form-control"
            id="imageUrl"
            placeholder="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
          />
          <div className="form-text text-muted">
            Provide a direct public image URL link.
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2">
          {onCancel && (
            <button
              type="button"
              className="btn btn-light px-4 fw-semibold"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
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
                Adding Photo...
              </>
            ) : (
              'Save Photo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PhotoForm;
