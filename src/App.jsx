import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import StudentProfile from './components/StudentProfile';
import ExplorerPass from './components/ExplorerPass';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [studentProfile, setStudentProfile] = useState(null);
  const [explorerPass, setExplorerPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartQuiz = () => {
    setCurrentStep('profile');
  };

  const handleProfileSubmit = async (profile) => {
    setLoading(true);
    setError(null);
    setStudentProfile(profile);
    
    try {
      const { api } = await import('./services/api');
      const fetchedQuestions = await api.getQuestions();
      setQuestions(fetchedQuestions);
      setCurrentStep('quiz');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = async (quizAnswers) => {
    setLoading(true);
    setError(null);
    setAnswers(quizAnswers);
    
    try {
      const { api } = await import('./services/api');
      const answersArray = Object.entries(quizAnswers).map(([questionId, selectedOptions]) => ({
        questionId: parseInt(questionId),
        selectedOptions: selectedOptions,
      }));

      const result = await api.submitQuiz(studentProfile, answersArray);
      setExplorerPass(result);
      setCurrentStep('pass');
    } catch (err) {
      setError(err.message);
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setQuestions([]);
    setAnswers({});
    setStudentProfile(null);
    setExplorerPass(null);
    setError(null);
  };

  return (
    <div className="app">
      <Header />
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {currentStep === 'landing' && (
        <LandingPage onStart={handleStartQuiz} loading={loading} />
      )}

      {currentStep === 'profile' && (
        <StudentProfile
          onSubmit={handleProfileSubmit}
          onBack={() => setCurrentStep('landing')}
          loading={loading}
        />
      )}

      {currentStep === 'quiz' && (
        <Quiz
          questions={questions}
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStep('profile')}
          loading={loading}
        />
      )}

      {currentStep === 'pass' && explorerPass && (
        <ExplorerPass
          pass={explorerPass}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;

