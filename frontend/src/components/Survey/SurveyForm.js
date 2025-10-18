import React, { useState, useEffect } from 'react';
import { questionAPI, surveyAPI } from '../../services/api';
import SurveyQuestion from './SurveyQuestion';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import './SurveyForm.css';

const SurveyForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadRandomQuestions();
  }, []);

  const loadRandomQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await questionAPI.getRandomQuestions();
      setQuestions(response.data);
      // Initialize answers object
      const initialAnswers = {};
      response.data.forEach(question => {
        initialAnswers[question._id] = '';
      });
      setAnswers(initialAnswers);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q._id] || answers[q._id].trim() === '');
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const surveyData = {
        sessionId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer
        }))
      };

      await surveyAPI.submitSurvey(surveyData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit survey. Please try again.');
      console.error('Error submitting survey:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error && !submitting) return <ErrorMessage message={error} onRetry={loadRandomQuestions} />;

  if (submitted) {
    return (
      <div className="survey-completed">
        <h2>Thank You!</h2>
        <p>Your survey responses have been recorded successfully.</p>
        <button onClick={() => window.location.reload()} className="retake-btn">
          Take Another Survey
        </button>
      </div>
    );
  }

  return (
    <div className="survey-form-container">
      <div className="survey-header">
        <h1>Quick Survey</h1>
        <p>Please answer the following 5 random questions:</p>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        {questions.map((question, index) => (
          <SurveyQuestion
            key={question._id}
            question={question}
            questionNumber={index + 1}
            answer={answers[question._id]}
            onAnswerChange={handleAnswerChange}
          />
        ))}

        {error && <ErrorMessage message={error} />}

        <div className="survey-actions">
          <button
            type="button"
            onClick={loadRandomQuestions}
            className="btn-secondary"
            disabled={submitting}
          >
            Get New Questions
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;