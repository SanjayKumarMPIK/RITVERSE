import React, { useState, useEffect } from 'react';
import './ExplorerPass.css';

function ExplorerPass({ pass, onRestart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Trigger animations
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowDetails(true), 800);
  }, []);

  return (
    <div className="explorer-pass-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className={`pass-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className="celebration-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.1}s`,
              '--angle': `${i * 18}deg`
            }}>✨</div>
          ))}
        </div>

        <div className="pass-card">
          <div className="pass-header">
            <div className="universe-rank">{pass.universeRank}</div>
            <div className="status-badge">{pass.status}</div>
          </div>

          <div className="pass-main">
            <div className="badge-container">
              <div className="badge-glow"></div>
              <div className="badge">{pass.badge}</div>
            </div>

            <h1 className="pass-title">{pass.passTitle}</h1>
            <p className="signature-line">{pass.signatureLine}</p>
          </div>

          <div className={`pass-details ${showDetails ? 'show' : ''}`}>
            <div className="details-section">
              <h3 className="details-title">⚡ Power Traits</h3>
              <div className="traits-list">
                {pass.powerTraits.map((trait, index) => (
                  <div key={index} className="trait-item" style={{ '--delay': `${index * 0.1}s` }}>
                    <span className="trait-icon">✨</span>
                    <span className="trait-text">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="details-section">
              <h3 className="details-title">🎯 Fun Skills to Explore</h3>
              <div className="skills-list">
                {pass.funSkills.map((skill, index) => (
                  <div key={index} className="skill-item" style={{ '--delay': `${(index + 3) * 0.1}s` }}>
                    <span className="skill-icon">🚀</span>
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pass-message">{pass.message}</div>

          <div className="pass-actions">
            <button className="restart-button" onClick={onRestart}>
              <span>🔄</span>
              <span>Explore Again</span>
            </button>
            <button 
              className="share-button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My RITVerse Explorer Pass',
                    text: `I'm a ${pass.passTitle}! ${pass.signatureLine}`,
                  });
                } else {
                  navigator.clipboard.writeText(`I'm a ${pass.passTitle} in RITVerse! ${pass.signatureLine}`);
                  alert('Pass details copied to clipboard!');
                }
              }}
            >
              <span>📤</span>
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="pass-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}

export default ExplorerPass;

