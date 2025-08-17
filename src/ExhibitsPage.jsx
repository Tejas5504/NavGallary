import React, { useState, useEffect } from 'react';
import './GalleryPage.css'; // Reusing the gallery styles for the grid

const ExhibitsPage = () => {
  // State now holds an array of images
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Updated function to fetch a list of 10 random images
  const fetchExhibits = async () => {
    setIsLoading(true);
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const apiUrl = `https://picsum.photos/v2/list?page=${randomPage}&limit=9`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch exhibits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect still runs once on initial load
  useEffect(() => {
    fetchExhibits();
  }, []);

  return (
    <div className="gallery-container" style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Random Exhibits</h1>

      {/* Main content area */}
      <div style={{ minHeight: '60vh' }}>
        {isLoading ? (
          <p style={{ color: 'white' }}>Loading new exhibits...</p>
        ) : (
          // Display the images in a grid
          <div className="gallery-grid">
            {images.map(image => (
              <div key={image.id} className="gallery-item">
                <img 
                  src={image.download_url} 
                  alt={`Photograph by ${image.author}`} 
                />
                <p>By: {image.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Button is now located at the bottom of the page */}
      <button 
        onClick={fetchExhibits} 
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '30px', cursor: 'pointer' }}
      >
        Get New Exhibits
      </button>
    </div>
  );
};

export default ExhibitsPage;