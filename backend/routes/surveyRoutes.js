const express = require('express');
const router = express.Router();
const {
  submitSurvey,
  getSurveyResults,
  getSurveyStats
} = require('../controllers/surveyController');

router.post('/submit', submitSurvey);
router.get('/results', getSurveyResults);
router.get('/stats', getSurveyStats);

module.exports = router;