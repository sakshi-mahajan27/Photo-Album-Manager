import React from 'react';
import { Link } from 'react-router-dom';

function AlbumsPage() {
  return (
    <div className="container pb-5">
      <div className="text-center my-4">
        <h1 className="fw-bold text-dark display-6 mb-2">My Albums</h1>
        <p className="text-secondary fs-5">
          Organize, manage, and view your photo collections effortlessly.
        </p>
      </div>

      <div className="card shadow-sm p-4 text-center mx-auto" style={{ maxWidth: '600px' }}>
        <h5 className="card-title fw-bold text-primary-emphasis mb-3">Albums Page Placeholder</h5>
        <div>
          <Link to="/albums/1" className="btn btn-primary px-4 py-2 fw-semibold me-2">
            Open Album #1 (Sample Link)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlbumsPage;
