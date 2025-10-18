const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'text'],
    default: 'multiple-choice'
  },
  options: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    default: 'general'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);