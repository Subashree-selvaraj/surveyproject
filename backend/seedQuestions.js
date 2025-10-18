// backend/seedQuestions.js
const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const sampleQuestions = [
  {
    questionText: "How satisfied are you with our service?",
    questionType: "multiple-choice",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"],
    category: "general"
  },
  {
    questionText: "What features would you like to see in future updates?",
    questionType: "text",
    category: "technology"
  },
  {
    questionText: "How often do you use our product?",
    questionType: "multiple-choice",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "First Time"],
    category: "lifestyle"
  },
  {
    questionText: "What is your preferred method of communication?",
    questionType: "multiple-choice",
    options: ["Email", "Phone", "Text Message", "In-Person", "Video Call"],
    category: "general"
  },
  {
    questionText: "How likely are you to recommend us to others?",
    questionType: "multiple-choice",
    options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
    category: "opinion"
  },
  {
    questionText: "What challenges are you facing with our product?",
    questionType: "text",
    category: "technology"
  },
  {
    questionText: "Which social media platforms do you use regularly?",
    questionType: "multiple-choice",
    options: ["Facebook", "Twitter", "Instagram", "LinkedIn", "TikTok", "None"],
    category: "lifestyle"
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/survey_app';
    if (!process.env.MONGODB_URI) {
      console.warn('Warning: MONGODB_URI not set in environment; using fallback', mongoUri);
    }
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database:', mongoUri);

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('Sample questions added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();