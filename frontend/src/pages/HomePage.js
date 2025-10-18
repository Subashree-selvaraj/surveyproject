import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SurveyApp</h1>
          <p>Share your opinions and help us improve by taking our quick 5-question survey.</p>
          <div className="hero-actions">
            <Link to="/survey" className="cta-button">
              Take Survey Now
            </Link>
            <Link to="/admin" className="secondary-button">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Random Questions</h3>
              <p>Get 5 random questions from our diverse question bank each time you take the survey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Easy</h3>
              <p>Complete the survey in just a few minutes. Your time is valuable to us.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Anonymous</h3>
              <p>Your responses are completely anonymous. No personal information required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;