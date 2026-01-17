import React from 'react';
import './Header.css';

function Header() {
  // Logo is loaded from public folder - no import needed
  // Place your exact RIT logo image in the public/ folder
  // Supported formats: .png, .jpg, .jpeg, .svg
  // Name it: rit-logo.png (or update the path below)
  const logoPath = '/rit-logo.png';
  
  return (
    <header className="rit-header">
      <div className="rit-logo-container">
        <img 
          src={logoPath} 
          alt="Rajalakshmi Institute of Technology" 
          className="rit-logo-image"
          style={{ display: 'block', visibility: 'visible' }}
        />
      </div>
    </header>
  );
}

export default Header;
