import React, { useState } from 'react';
import { questionAPI } from '../../services/api';
import { QUESTION_TYPES, CATEGORIES } from '../../utils/constants';
import './AddQuestion.css';

const AddQuestion = ({ onQuestionAdded }) => {
  const [formData, setFormData] = useState({
    questionText: '',
    questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
    category: CATEGORIES.GENERAL,
    options: ['', '', '', '']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.questionText.trim()) {
      setError('Question text is required');
      return;
    }

    if (formData.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
      const validOptions = formData.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        setError('At least two options are required for multiple choice questions');
        return;
      }
      formData.options = validOptions;
    }

    try {
      setLoading(true);
      setError(null);
      await questionAPI.addQuestion(formData);
      setSuccess(true);
      setFormData({
        questionText: '',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        category: CATEGORIES.GENERAL,
        options: ['', '', '', '']
      });
      if (onQuestionAdded) {
        onQuestionAdded();
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Error adding question:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-question">
      <h2>Add New Question</h2>
      
      {success && (
        <div className="success-message">
          Question added successfully!
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="questionText">Question Text *</label>
          <textarea
            id="questionText"
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="questionType">Question Type</label>
            <select
              id="questionType"
              name="questionType"
              value={formData.questionType}
              onChange={handleInputChange}
            >
              <option value={QUESTION_TYPES.MULTIPLE_CHOICE}>Multiple Choice</option>
              <option value={QUESTION_TYPES.TEXT}>Text Answer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {Object.entries(CATEGORIES).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formData.questionType === QUESTION_TYPES.MULTIPLE_CHOICE && (
          <div className="options-section">
            <label>Options *</label>
            {formData.options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="remove-option-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="add-option-btn"
            >
              + Add Option
            </button>
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Adding Question...' : 'Add Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;