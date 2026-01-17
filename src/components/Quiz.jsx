import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz({ questions, onComplete, onBack, loading }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionTransition, setQuestionTransition] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const getPlanetTheme = (planet) => {
    const themes = {
      'NEUTRON': {
        name: 'Neutron',
        displayName: 'Neutron',
        emoji: '🧠',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        bgGradient: 'linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%)',
        glowColor: 'rgba(240, 147, 251, 0.4)',
        particles: '✨',
      },
      'TALENT': {
        name: 'Talent Nebula',
        displayName: 'Talent Nebula',
        emoji: '⭐',
        gradient: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
        bgGradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 140, 0, 0.15) 100%)',
        glowColor: 'rgba(255, 215, 0, 0.4)',
        particles: '🌟',
      },
      'ORBIT': {
        name: 'Orbit-X',
        displayName: 'Orbit-X',
        emoji: '🎭',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bgGradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
        glowColor: 'rgba(102, 126, 234, 0.4)',
        particles: '💫',
      },
      'FUTURIA': {
        name: 'Futuria',
        displayName: 'Futuria',
        emoji: '🚀',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        bgGradient: 'linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)',
        glowColor: 'rgba(79, 172, 254, 0.4)',
        particles: '⚡',
      },
    };
    return themes[planet] || themes['NEUTRON'];
  };

  useEffect(() => {
    if (currentQuestion) {
      const saved = answers[currentQuestion.id] || [];
      setSelectedOptions(saved);
      setQuestionTransition(false);
      setTimeout(() => setQuestionTransition(true), 50);
    }
  }, [currentQuestionIndex, currentQuestion, answers]);

  const handleOptionToggle = (optionKey) => {
    if (!currentQuestion) return;

    if (currentQuestion.multiSelect) {
      const maxSelect = currentQuestion.maxSelect || Infinity;
      let newSelection;
      
      if (selectedOptions.includes(optionKey)) {
        newSelection = selectedOptions.filter(opt => opt !== optionKey);
      } else {
        if (selectedOptions.length >= maxSelect) {
          return;
        }
        newSelection = [...selectedOptions, optionKey];
      }
      
      setSelectedOptions(newSelection);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: newSelection
      }));
    } else {
      const newSelection = [optionKey];
      setSelectedOptions(newSelection);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: newSelection
      }));
    }
  };

  const handleNext = () => {
    setQuestionTransition(false);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onComplete(answers);
      }
    }, 300);
  };

  const handlePrevious = () => {
    setQuestionTransition(false);
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      }
    }, 300);
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    return selectedOptions.length > 0;
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Preparing your space journey...</p>
      </div>
    );
  }

  const planetTheme = getPlanetTheme(currentQuestion.planet);

  return (
    <div 
      className="quiz-container"
      style={{ '--planet-gradient': planetTheme.bgGradient, '--planet-glow': planetTheme.glowColor }}
    >
      <div className="planet-background" style={{ background: planetTheme.bgGradient }}>
        <div className="planet-particles">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="particle" style={{
              '--delay': `${i * 0.2}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
            }}>{planetTheme.particles}</span>
          ))}
        </div>
      </div>

      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%`, background: planetTheme.gradient }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className={`quiz-content ${questionTransition ? 'visible' : ''}`}>
        <div className="planet-header">
          <div className="planet-badge-large" style={{ background: planetTheme.gradient }}>
            <span className="planet-emoji-large">{planetTheme.emoji}</span>
            <div className="planet-info">
              <span className="planet-label">You're exploring</span>
              <span className="planet-name-large">{planetTheme.displayName}</span>
            </div>
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">{currentQuestion.text}</h2>

          {currentQuestion.multiSelect && currentQuestion.maxSelect && (
            <div className="multi-select-hint">
              <span className="hint-icon">💡</span>
              <span>Select up to {currentQuestion.maxSelect} option{currentQuestion.maxSelect > 1 ? 's' : ''}</span>
              {selectedOptions.length > 0 && (
                <span className="selection-count">({selectedOptions.length}/{currentQuestion.maxSelect})</span>
              )}
            </div>
          )}
        </div>

        <div className="options-container">
          {Object.entries(currentQuestion.options).map(([key, option], index) => {
            const isSelected = selectedOptions.includes(key);
            return (
              <button
                key={key}
                className={`option-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionToggle(key)}
                disabled={
                  currentQuestion.multiSelect &&
                  !isSelected &&
                  selectedOptions.length >= (currentQuestion.maxSelect || Infinity)
                }
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--planet-gradient': planetTheme.gradient,
                }}
              >
                <div className="option-content">
                  <span className="option-key">{key}</span>
                  <span className="option-text">{option.text}</span>
                </div>
                {isSelected && (
                  <div className="selected-indicator">
                    <span className="checkmark">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="quiz-navigation">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={!canProceed() || loading}
            style={{ background: planetTheme.gradient }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{currentQuestionIndex === questions.length - 1 ? 'Complete Journey →' : 'Next →'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
