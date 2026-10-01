import React from 'react';

function PhotoCard({ photo, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the photo "${photo.title}"?`)) {
      onDelete(photo.id);
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0 position-relative">
        <div className="overflow-hidden bg-light rounded-top" style={{ height: '200px' }}>
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="card-img-top w-100 h-100 object-fit-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x400/e9ecef/6c757d?text=Image+Not+Found';
            }}
          />
        </div>
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <h6 className="card-title fw-bold text-dark mb-3 text-truncate" title={photo.title}>
            {photo.title}
          </h6>
          <div className="d-flex justify-content-end pt-2 border-top">
            <button
              onClick={handleDeleteClick}
              className="btn btn-outline-danger btn-sm px-3 fw-semibold d-flex align-items-center gap-1"
              title="Delete Photo"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
