import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  // Login and Sign Up are removed from this list
  const menuItems = [
    { id: 1, name: 'Gallery', icon_class: 'fa-solid fa-image', link_url: '/gallery' },
    { id: 2, name: 'Shortcuts', icon_class: 'fa-solid fa-arrow-up-right-from-square', link_url: '/shortcuts' },
    { id: 3, name: 'Exhibits', icon_class: 'fa-solid fa-photo-film', link_url: '/exhibits' },
    { id: 6, name: 'Contact', icon_class: 'fa-solid fa-phone', link_url: '/contact' },
  ];

  return (
    <div className={isOpen ? "sidebar_menu open" : "sidebar_menu"}>
      <div className="logo">
        <Link to="/gallery">NavGallary</Link>
      </div>

      <div className="btn_two">
        <label onClick={toggleSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </label>
      </div>

      <div className="menu">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <i className={item.icon_class}></i>
              <NavLink to={item.link_url}>{item.name}</NavLink>
            </li>
          ))}
          {/* Static Logout Button */}
          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <a href="#" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>

      <div className="social_media">
        <ul>
            <a href="https://www.facebook.com"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.twitter.com"><i className="fa-brands fa-twitter"></i></a>
            <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com"><i className="fa-brands fa-youtube"></i></a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;