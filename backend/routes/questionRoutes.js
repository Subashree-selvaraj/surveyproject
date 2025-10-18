const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getRandomQuestions,
  addQuestion,
  updateQuestion
} = require('../controllers/questionController');

router.get('/', getQuestions);
router.get('/random', getRandomQuestions);
router.post('/', addQuestion);
router.put('/:id', updateQuestion);

module.exports = router;