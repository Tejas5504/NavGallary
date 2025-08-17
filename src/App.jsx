import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from './MainLayout';
import GalleryPage from './GalleryPage';
import ShortcutsPage from './ShortcutsPage';
import ExhibitsPage from './ExhibitsPage';
import ContactPage from './ContactPage';
import backgroundImage from './assets/photo.jpg';

function App() {
  return (
    <div className="main_box" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes Wrapper */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* These are the nested routes that will render inside MainLayout's <Outlet /> */}
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="shortcuts" element={<ShortcutsPage />} />
          <Route path="exhibits" element={<ExhibitsPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* Catch-all for any other unknown protected path, redirects to gallery */}
          <Route path="*" element={<Navigate to="/gallery" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;