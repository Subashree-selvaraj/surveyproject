import React, { useState, useEffect } from 'react';
import { questionAPI } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import './QuestionList.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getAllQuestions();
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to load questions');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestionStatus = async (questionId, currentStatus) => {
    try {
      await questionAPI.updateQuestion(questionId, {
        isActive: !currentStatus
      });
      loadQuestions(); // Reload questions to reflect changes
    } catch (err) {
      setError('Failed to update question status');
      console.error('Error updating question:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={loadQuestions} />;

  return (
    <div className="question-list">
      <div className="list-header">
        <h2>Question Management</h2>
        <button onClick={loadQuestions} className="refresh-btn">
          Refresh
        </button>
      </div>
      
      <div className="questions-grid">
        {questions.map((question) => (
          <div key={question._id} className="question-card">
            <div className="question-content">
              <h3>{question.questionText}</h3>
              <div className="question-meta">
                <span className={`type-badge ${question.questionType}`}>
                  {question.questionType}
                </span>
                <span className="category-badge">{question.category}</span>
                <span className={`status-badge ${question.isActive ? 'active' : 'inactive'}`}>
                  {question.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {question.questionType === 'multiple-choice' && (
                <div className="options-list">
                  <strong>Options:</strong>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="question-actions">
              <button
                onClick={() => toggleQuestionStatus(question._id, question.isActive)}
                className={`status-btn ${question.isActive ? 'deactivate' : 'activate'}`}
              >
                {question.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {questions.length === 0 && (
        <div className="no-questions">
          <p>No questions found. Add some questions to get started.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;