import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faHeading,
  faFloppyDisk,
  faXmark,
  faCircleExclamation,
  faUpload,
  faFileImage,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

function PhotoForm({ onAddPhoto, onCancel, isSubmitting = false }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) {
      return;
    }

    // 1. File Type Validation
    const isImage = file.type.startsWith('image/') || ALLOWED_TYPES.includes(file.type.toLowerCase());
    if (!isImage) {
      setError('Invalid file format. Please select a valid image file (JPG, JPEG, PNG, WEBP, GIF, SVG).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 2. File Size Validation (Max 5MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit. Please select a smaller image file.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 3. Read image file with FileReader
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (!dataUrl) {
        setError('Failed to read the image file. Please try selecting the file again.');
        return;
      }
      setImageUrl(dataUrl);
      setPreviewUrl(dataUrl);
      setSelectedFileName(file.name);
      setSelectedFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    };

    reader.onerror = () => {
      setError('An error occurred while reading the image file. The file may be unreadable or corrupt.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setImageUrl('');
    setPreviewUrl('');
    setSelectedFileName('');
    setSelectedFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedUrl = imageUrl.trim();

    if (!trimmedTitle) {
      setError('Photo title cannot be empty.');
      return;
    }

    if (!trimmedUrl) {
      setError('Please select an image file from your device.');
      return;
    }

    setError('');
    onAddPhoto({ title: trimmedTitle, imageUrl: trimmedUrl });

    // Reset form after successful submission
    setTitle('');
    setImageUrl('');
    setPreviewUrl('');
    setSelectedFileName('');
    setSelectedFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="card shadow-sm border-0 mb-4 p-4 bg-white rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Photo</span>
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
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="photoTitle" className="form-label fw-semibold text-dark d-flex align-items-center gap-1">
            <FontAwesomeIcon icon={faHeading} className="text-muted small" />
            <span>Photo Title</span>
            <span className="text-danger">*</span>
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

        {/* Device File Upload Field */}
        <div className="mb-3">
          <label htmlFor="photoFile" className="form-label fw-semibold text-dark d-flex align-items-center gap-1">
            <FontAwesomeIcon icon={faUpload} className="text-muted small" />
            <span>Choose Image File</span>
            <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className="form-control"
            id="photoFile"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          <div className="form-text text-muted">
            Select an image file from your computer or mobile device (JPG, PNG, WEBP, GIF, SVG - Max 5 MB).
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
                <span>Saving Photo...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <span>Save Photo</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PhotoForm;

