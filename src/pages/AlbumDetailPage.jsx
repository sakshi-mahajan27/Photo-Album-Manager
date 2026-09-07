import React from 'react';
import { useParams, Link } from 'react-router-dom';

function AlbumDetailPage() {
  // Extract album ID from URL parameters
  const { id } = useParams();

  return (
    <div className="container pb-5">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary btn-sm fw-semibold">
          &larr; Back to Albums
        </Link>
      </div>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="fw-bold text-primary-emphasis mb-3">Album Detail View</h2>
        <p className="text-secondary">
          This page will display photo cards, title searching, and photo creation forms.
        </p>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
