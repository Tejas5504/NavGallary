// src/GalleryPage.jsx

import React, { useState, useEffect } from 'react';
import './GalleryPage.css'; // We'll create this CSS file next

const API_URL = 'http://localhost:3001';

const GalleryPage = () => {
  // State to hold the list of images fetched from the DB
  const [images, setImages] = useState([]);
  // State for the file selected in the upload form
  const [selectedFile, setSelectedFile] = useState(null);
  // State for the photo description
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to create authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  // Function to fetch all images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`, {
        headers: getAuthHeaders() // Add authentication token
      });
      const data = await response.json();
      // Prepend the base URL to each file_path
      const imagesWithFullPaths = data.map(img => ({
        ...img,
        file_path: `${API_URL}${img.file_path}`
      }));
      setImages(imagesWithFullPaths);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  // useEffect runs once when the component loads to fetch the images
  useEffect(() => {
    fetchImages();
  }, []);

  // Handler for the form submission
  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    if (!selectedFile) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile); // The key 'photo' must match the backend upload.single('photo')
    formData.append('description', description);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: getAuthHeaders(), // Add authentication token
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('File uploaded successfully!');
      // Reset form and refresh the gallery
      setSelectedFile(null);
      setDescription('');
      document.querySelector('input[type="file"]').value = ''; // Clear file input
      fetchImages(); // Refresh gallery to show the new image
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. See console for details.');
    }
  };

  // Function to handle deleting media
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_URL}/api/gallery/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders() // Add authentication token
        });

        if (!response.ok) {
          throw new Error('Failed to delete image.');
        }

        alert('Item deleted successfully!');
        // Refresh the gallery by removing the deleted image from the state
        setImages(images.filter(image => image.id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image.');
      }
    }
  };

  return (
    <div className="gallery-container">
      <div className="upload-section">
        <h2>Upload a New Photo or Video</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*,video/*" //if you want to add anything add here for doc or anything 
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by description..."
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <hr className="divider" />
      <div className="gallery-grid">
        {images
          .filter(image =>
            image.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(media => {
            // Check if the file path ends with a video extension
            const isVideo = media.file_path.endsWith('.mp4') || media.file_path.endsWith('.webm') || media.file_path.endsWith('.ogg');

            return (
              <div key={media.id} className="gallery-item">
                {isVideo ? (
                  <video width="100%" height="200px" controls style={{ backgroundColor: '#000' }}>
                    <source src={media.file_path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={media.file_path}
                    alt={media.description}
                  />
                )}
                <p>{media.description}</p>
                <button className="delete-btn" onClick={() => handleDelete(media.id)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GalleryPage;