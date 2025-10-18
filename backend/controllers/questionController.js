const Question = require('../models/Question');

// Get all active questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isActive: true });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get random 5 questions
exports.getRandomQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 5 } }
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new question
exports.addQuestion = async (req, res) => {
  try {
    const { questionText, questionType, options, category } = req.body;
    
    const question = new Question({
      questionText,
      questionType,
      options,
      category
    });
    
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: 'Error creating question', error: error.message });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: 'Error updating question', error: error.message });
  }
};