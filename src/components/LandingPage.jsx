import React from 'react';
import './LandingPage.css';

function LandingPage({ onStart, loading }) {
  return (
    <div className="landing-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className="landing-content fade-in">
        <div className="logo-container">
          <div className="ritverse-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">RITVerse</span>
          </div>
        </div>

        <div className="landing-text">
          <h1 className="landing-title">
            <span className="title-line-1">
              <span className="title-highlight">Explore</span> Yourself.
            </span>
            <span className="title-line-2">Discover Your Universe.</span>
          </h1>
          <p className="landing-subtitle">
            A fun space journey to understand your interests and strengths. No tests. No scores. Just discovery! 🚀
          </p>
        </div>

        <button
          className="start-button"
          onClick={onStart}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Launching...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Start Your Space Mission</span>
            </>
          )}
        </button>

        <div className="journey-section">
          <p className="journey-label">Your journey through the galaxy:</p>
          <div className="planets-row">
            <div className="planet-card" data-planet="earth">
              <div className="planet-icon earth-icon">🌍</div>
              <span className="planet-name">Earth Base</span>
            </div>
            <div className="planet-card" data-planet="neutron">
              <div className="planet-icon neutron-icon">🧠</div>
              <span className="planet-name">Neutron</span>
            </div>
            <div className="planet-card" data-planet="talent">
              <div className="planet-icon talent-icon">⭐</div>
              <span className="planet-name">Talent Nebula</span>
            </div>
            <div className="planet-card" data-planet="orbit">
              <div className="planet-icon orbit-icon">🎭</div>
              <span className="planet-name">Orbit-X</span>
            </div>
            <div className="planet-card" data-planet="futuria">
              <div className="planet-icon futuria-icon">🚀</div>
              <span className="planet-name">Futuria</span>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3 className="feature-title">Fun & Interactive</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💝</div>
            <h3 className="feature-title">No Pressure</h3>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☀️</div>
            <h3 className="feature-title">Discover You</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
