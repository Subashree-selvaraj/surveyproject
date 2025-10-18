import React from 'react';
import './SurveyQuestion.css';

const SurveyQuestion = ({ question, answer, onAnswerChange, questionNumber }) => {
  const handleInputChange = (value) => {
    onAnswerChange(question._id, value);
  };

  return (
    <div className="survey-question">
      <h3>Question {questionNumber}</h3>
      <p className="question-text">{question.questionText}</p>
      
      {question.questionType === 'multiple-choice' ? (
        <div className="options-container">
          {question.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={answer === option}
                onChange={() => handleInputChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <textarea
          className="text-answer"
          value={answer || ''}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
        />
      )}
    </div>
  );
};

export default SurveyQuestion;