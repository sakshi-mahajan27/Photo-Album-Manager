import React, { useState, useEffect } from 'react';
import AlbumCard from '../components/AlbumCard';
import AlbumForm from '../components/AlbumForm';

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'http://localhost:5000';

  // Fetch albums and photos on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [albumsRes, photosRes] = await Promise.all([
        fetch(`${API_URL}/albums`),
        fetch(`${API_URL}/photos`)
      ]);

      if (!albumsRes.ok || !photosRes.ok) {
        throw new Error('Failed to fetch data from JSON Server');
      }

      const albumsData = await albumsRes.json();
      const photosData = await photosRes.json();

      setAlbums(albumsData);
      setPhotos(photosData);
    } catch (err) {
      setError('Unable to connect to backend server on http://localhost:5000. Please ensure JSON Server is running (run `npm run server` or `npm run dev:all`).');
    } finally {
      setLoading(false);
    }
  };

  // Add a new album via POST request
  const handleAddAlbum = async (albumName) => {
    setIsSubmitting(true);
    try {
      const newAlbum = {
        name: albumName,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`${API_URL}/albums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum)
      });

      if (!response.ok) {
        throw new Error('Failed to create new album');
      }

      const createdAlbum = await response.json();
      setAlbums((prev) => [...prev, createdAlbum]);
      setShowForm(false);
    } catch (err) {
      alert('Unable to connect to backend server. Please ensure JSON Server is running on port 5000 (run `npm run server` or `npm run dev:all`).');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete an album and its associated photos via DELETE request
  const handleDeleteAlbum = async (id) => {
    try {
      const response = await fetch(`${API_URL}/albums/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete album');
      }

      // Also clean up associated photos for this album
      const albumPhotos = photos.filter((p) => String(p.albumId) === String(id));
      await Promise.all(
        albumPhotos.map((p) =>
          fetch(`${API_URL}/photos/${p.id}`, { method: 'DELETE' })
        )
      );

      setAlbums((prev) => prev.filter((album) => String(album.id) !== String(id)));
      setPhotos((prev) => prev.filter((p) => String(p.albumId) !== String(id)));
    } catch (err) {
      alert(err.message || 'Error deleting album.');
    }
  };

  // Helper to count photos for a given album ID
  const getPhotoCount = (albumId) => {
    return photos.filter((p) => String(p.albumId) === String(albumId)).length;
  };

  return (
    <div className="container pb-5">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-3">
        <div>
          <h1 className="fw-bold text-dark display-6 mb-1">My Albums</h1>
          <p className="text-secondary mb-0">
            Create, view, and organize your photo collections ({albums.length} {albums.length === 1 ? 'Album' : 'Albums'})
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary px-4 py-2 fw-semibold shadow-sm align-self-start align-self-md-center"
        >
          {showForm ? 'Close Form' : 'Create New Album'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger shadow-sm d-flex align-items-center mb-4" role="alert">
          <div>
            <strong>Error:</strong> {error}
            <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchData}>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Album Form */}
      {showForm && (
        <AlbumForm
          onAddAlbum={handleAddAlbum}
          onCancel={() => setShowForm(false)}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-semibold">Loading albums...</p>
        </div>
      ) : albums.length === 0 ? (
        /* Empty State */
        <div className="text-center py-5 bg-white rounded-3 shadow-sm border p-5">
          <h4 className="fw-bold text-dark mb-2">No Albums Found</h4>
          <p className="text-muted mb-4">
            You don't have any photo albums yet. Click the button below to create your first album!
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary px-4 py-2 fw-semibold"
          >
            Create First Album
          </button>
        </div>
      ) : (
        /* Albums Grid */
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              photoCount={getPhotoCount(album.id)}
              onDelete={handleDeleteAlbum}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumsPage;
