import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import PhotoForm from '../components/PhotoForm';
import SearchBar from '../components/SearchBar';

function AlbumDetailPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchAlbumData();
  }, [id]);

  const fetchAlbumData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [albumRes, photosRes] = await Promise.all([
        fetch(`${API_URL}/albums/${id}`),
        fetch(`${API_URL}/photos`)
      ]);

      if (albumRes.status === 404) {
        throw new Error('Album not found. It may have been deleted.');
      }

      if (!albumRes.ok || !photosRes.ok) {
        throw new Error('Failed to fetch album details from server.');
      }

      const albumData = await albumRes.json();
      const photosData = await photosRes.json();

      // Filter photos belonging to this album
      const albumPhotos = photosData.filter((p) => String(p.albumId) === String(id));

      setAlbum(albumData);
      setPhotos(albumPhotos);
    } catch (err) {
      setError(err.message || 'Unable to load album details.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new photo via POST request
  const handleAddPhoto = async (photoData) => {
    setIsSubmitting(true);
    try {
      const newPhoto = {
        albumId: id,
        title: photoData.title,
        imageUrl: photoData.imageUrl
      };

      const response = await fetch(`${API_URL}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPhoto)
      });

      if (!response.ok) {
        throw new Error('Failed to save new photo');
      }

      const createdPhoto = await response.json();
      setPhotos((prev) => [...prev, createdPhoto]);
      setShowPhotoForm(false);
    } catch (err) {
      alert(err.message || 'Error adding photo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a photo via DELETE request
  const handleDeletePhoto = async (photoId) => {
    try {
      const response = await fetch(`${API_URL}/photos/${photoId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      setPhotos((prev) => prev.filter((photo) => String(photo.id) !== String(photoId)));
    } catch (err) {
      alert(err.message || 'Error deleting photo.');
    }
  };

  // Compute case-insensitive filtered photos list in memory
  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="container pb-5">
      {/* Navigation Header */}
      <div className="mb-4 pt-2">
        <Link to="/" className="btn btn-outline-secondary btn-sm px-3 fw-semibold">
          &larr; Back to Albums
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Loading album details...</p>
        </div>
      ) : error ? (
        /* Error / Not Found State */
        <div className="card shadow-sm border-0 p-5 text-center bg-white mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="fw-bold text-dark mb-2">Album Error</h4>
          <p className="text-secondary mb-4">{error}</p>
          <div>
            <Link to="/" className="btn btn-primary px-4 fw-semibold">
              Return to All Albums
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Album Title Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-3 gap-3 border-bottom pb-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h1 className="fw-bold text-dark display-6 mb-0">{album?.name}</h1>
                <span className="badge bg-purple-subtle text-purple border border-purple-subtle rounded-pill px-3 py-2 fs-6">
                  {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>
              <p className="text-secondary small mb-0">
                Created: {album?.createdAt ? new Date(album.createdAt).toLocaleDateString() : 'Recently'}
              </p>
            </div>

            <button
              onClick={() => setShowPhotoForm(!showPhotoForm)}
              className="btn btn-primary px-4 py-2 fw-semibold shadow-sm align-self-start align-self-md-center"
            >
              {showPhotoForm ? 'Close Form' : 'Add Photo'}
            </button>
          </div>

          {/* Photo Form Container */}
          {showPhotoForm && (
            <PhotoForm
              onAddPhoto={handleAddPhoto}
              onCancel={() => setShowPhotoForm(false)}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Search Bar (Rendered when album has photos) */}
          {photos.length > 0 && (
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder={`Search ${photos.length} photos by title...`}
            />
          )}

          {/* Photos Grid / Empty State */}
          {photos.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 shadow-sm border p-5 mt-4">
              <h4 className="fw-bold text-dark mb-2">No Photos in this Album</h4>
              <p className="text-muted mb-4">
                This album is currently empty. Click the button below to add your first photo!
              </p>
              <button
                onClick={() => setShowPhotoForm(true)}
                className="btn btn-primary px-4 py-2 fw-semibold"
              >
                Add First Photo
              </button>
            </div>
          ) : filteredPhotos.length === 0 ? (
            /* Empty Search Results State */
            <div className="text-center py-5 bg-white rounded-3 shadow-sm border p-5">
              <h5 className="fw-bold text-dark mb-2">No Matching Photos Found</h5>
              <p className="text-muted mb-4">
                No photos in <strong>"{album?.name}"</strong> match your search query "<strong>{searchTerm}</strong>".
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-outline-primary px-4 py-2 fw-semibold"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            /* Photos Grid */
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-1">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onDelete={handleDeletePhoto}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AlbumDetailPage;
