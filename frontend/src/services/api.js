import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions API
export const questionAPI = {
  getRandomQuestions: () => api.get('/questions/random'),
  getAllQuestions: () => api.get('/questions'),
  addQuestion: (questionData) => api.post('/questions', questionData),
  updateQuestion: (id, questionData) => api.put(`/questions/${id}`, questionData),
};

// Survey API
export const surveyAPI = {
  submitSurvey: (surveyData) => api.post('/survey/submit', surveyData),
  getResults: () => api.get('/survey/results'),
  getStats: () => api.get('/survey/stats'),
};

export default api;