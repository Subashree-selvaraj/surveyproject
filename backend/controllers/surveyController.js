const SurveyResponse = require('../models/SurveyResponse');
const Question = require('../models/Question');

// Submit survey responses
exports.submitSurvey = async (req, res) => {
  try {
    const { sessionId, answers } = req.body;

    // Validate that exactly 5 questions are answered
    if (!answers || answers.length !== 5) {
      return res.status(400).json({ message: 'Please answer exactly 5 questions' });
    }

    // Check if session already submitted
    const existingResponse = await SurveyResponse.findOne({ sessionId });
    if (existingResponse) {
      return res.status(400).json({ message: 'Survey already submitted for this session' });
    }

    const surveyResponse = new SurveyResponse({
      sessionId,
      answers
    });

    await surveyResponse.save();
    res.status(201).json({ message: 'Survey submitted successfully', data: surveyResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get survey results (for admin purposes)
exports.getSurveyResults = async (req, res) => {
  try {
    const responses = await SurveyResponse.find().populate('answers.questionId');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get survey statistics
exports.getSurveyStats = async (req, res) => {
  try {
    const totalResponses = await SurveyResponse.countDocuments();
    const questions = await Question.find({ isActive: true });
    
    const stats = {
      totalResponses,
      totalQuestions: questions.length,
      activeQuestions: questions.filter(q => q.isActive).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};