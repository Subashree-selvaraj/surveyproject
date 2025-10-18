import React from 'react';
import './SurveyResults.css';

const SurveyResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className="no-results">No survey results available.</div>;
  }

  return (
    <div className="survey-results">
      <h2>Survey Results</h2>
      <div className="results-grid">
        {results.map((response, index) => (
          <div key={response._id} className="response-card">
            <h3>Response #{index + 1}</h3>
            <p className="response-date">
              Submitted: {new Date(response.completedAt).toLocaleDateString()}
            </p>
            <div className="answers-list">
              {response.answers.map((answer, ansIndex) => (
                <div key={ansIndex} className="answer-item">
                  <strong>Q{ansIndex + 1}:</strong> 
                  <span>{answer.answer}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyResults;