import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './ExplorerPass.css';

function ExplorerPass({ pass, onRestart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const passCardRef = useRef(null);

  useEffect(() => {
    // Trigger animations
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowDetails(true), 800);
  }, []);

  const downloadPassAsImage = async () => {
    if (!passCardRef.current) return;

    try {
      // Wait a bit to ensure all animations are complete
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get the actual dimensions of the card
      const cardRect = passCardRef.current.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = passCardRef.current.scrollHeight || passCardRef.current.offsetHeight;
      
      // Create a certificate container with no padding - exact card dimensions
      const certificateContainer = document.createElement('div');
      certificateContainer.className = 'certificate-container';
      certificateContainer.style.position = 'absolute';
      certificateContainer.style.left = '-9999px';
      certificateContainer.style.top = '0';
      certificateContainer.style.width = `${cardWidth}px`;
      certificateContainer.style.background = 'transparent';
      certificateContainer.style.padding = '0';
      certificateContainer.style.margin = '0';
      certificateContainer.style.display = 'block';
      certificateContainer.style.boxSizing = 'border-box';
      certificateContainer.style.overflow = 'hidden';
      document.body.appendChild(certificateContainer);

      // Clone the pass card content (without buttons)
      const cardClone = passCardRef.current.cloneNode(true);
      const actionsElement = cardClone.querySelector('.pass-actions');
      if (actionsElement) {
        actionsElement.remove();
      }
      
      // Ensure details are visible in the clone
      const detailsElement = cardClone.querySelector('.pass-details');
      if (detailsElement) {
        detailsElement.classList.add('show');
        detailsElement.style.opacity = '1';
        detailsElement.style.transform = 'translateY(0)';
      }
      
      // Make sure all trait and skill items are visible
      const traitItems = cardClone.querySelectorAll('.trait-item');
      traitItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      
      const skillItems = cardClone.querySelectorAll('.skill-item');
      skillItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      
      // Add capturing class to the clone for better rendering
      cardClone.classList.add('capturing');
      cardClone.style.margin = '0';
      cardClone.style.width = `${cardWidth}px`;
      cardClone.style.position = 'relative';
      cardClone.style.overflow = 'visible';
      
      certificateContainer.appendChild(cardClone);

      // Wait for rendering to ensure all content is laid out
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Force a reflow to ensure all measurements are accurate
      certificateContainer.offsetHeight;
      
      // Calculate final dimensions based on actual rendered content
      // Use the maximum of scrollHeight and offsetHeight to ensure we get all content
      const cardCloneHeight = Math.max(
        cardClone.scrollHeight, 
        cardClone.offsetHeight,
        cardClone.getBoundingClientRect().height
      );
      
      // Set container height to exactly match the card height - no extra padding
      certificateContainer.style.height = `${cardCloneHeight}px`;
      certificateContainer.style.width = `${cardWidth}px`;

      // Force another reflow
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the certificate container - exact dimensions, no extra space
      const finalWidth = cardWidth;
      const actualHeight = cardCloneHeight;
      
      const canvas = await html2canvas(certificateContainer, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        width: finalWidth,
        height: actualHeight,
        windowWidth: finalWidth,
        windowHeight: actualHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        allowTaint: false,
      });

      // Clean up
      document.body.removeChild(certificateContainer);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `RITVerse-Explorer-Pass-${pass.passTitle.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

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

        <div className="pass-card" ref={passCardRef}>
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
              onClick={downloadPassAsImage}
            >
              <span>📥</span>
              <span>Download Pass</span>
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

