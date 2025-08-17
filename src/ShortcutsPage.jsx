import React, { useState, useEffect } from 'react';
import './GalleryPage.css'; // We can reuse the gallery styles
import './ShortcutsPage.css'; // And add our new button styles

const API_URL = 'https://gallary-backend-48bt.onrender.com';

const ShortcutsPage = () => {
  const [media, setMedia] = useState([]);
  // 1. NEW STATE: To keep track of the current filter ('all', 'image', or 'video')
  const [filter, setFilter] = useState('all');

  // Helper function to create authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  // This function fetches all media, same as in the gallery
  const fetchMedia = async () => {
    try {
      // Add the authentication headers to the fetch request
      const response = await fetch(`${API_URL}/api/gallery`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      const mediaWithFullPaths = data.map(item => ({
        ...item,
        file_path: `${API_URL}${item.file_path}`
      }));
      setMedia(mediaWithFullPaths);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // 2. FILTERING LOGIC: Create a list of items to display based on the current filter
  const filteredMedia = media.filter(item => {
    const isVideo = item.file_path.endsWith('.mp4') || item.file_path.endsWith('.webm');
    if (filter === 'all') {
      return true; // Show all items
    }
    if (filter === 'image') {
      return !isVideo; // Show only if it's NOT a video
    }
    if (filter === 'video') {
      return isVideo; // Show only if it IS a video
    }
    return true;
  });

  return (
    <div className="gallery-container">
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Media Shortcuts</h1>

      {/* 3. FILTER BUTTONS: These buttons will change the filter state */}
      <div className="filter-controls">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          Show All
        </button>
        <button onClick={() => setFilter('image')} className={filter === 'image' ? 'active' : ''}>
          Images Only
        </button>
        <button onClick={() => setFilter('video')} className={filter === 'video' ? 'active' : ''}>
          Videos Only
        </button>
      </div>

      <div className="gallery-grid">
        {/* 4. RENDER THE FILTERED LIST: We map over the filteredMedia array now */}
        {filteredMedia.map(item => {
          const isVideo = item.file_path.endsWith('.mp4') || item.file_path.endsWith('.webm');
          return (
            <div key={item.id} className="gallery-item">
              {isVideo ? (
                <video width="100%" height="200px" controls style={{ backgroundColor: '#000' }}>
                  <source src={item.file_path} type="video/mp4" />
                </video>
              ) : (
                <img src={item.file_path} alt={item.description} />
              )}
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShortcutsPage;
