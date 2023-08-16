import mongoose, { Document, Model } from 'mongoose';

interface QuizDocument extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizSchema = new mongoose.Schema<QuizDocument>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Custom method to check uniqueness before saving
quizSchema.pre('save', async function (next) {
  const quiz = this as QuizDocument;

  // Check if a document with the same question and correctAnswer already exists
  const existingQuiz = await mongoose.model<QuizDocument>('Quiz').findOne({
    question: quiz.question,
    correctAnswer: quiz.correctAnswer,
  });

  if (existingQuiz) {
    throw new Error('Quiz with the same question and correctAnswer already exists');
  }

  next();
});

const QuizModel: Model<QuizDocument> =
  mongoose.models.Quiz || mongoose.model<QuizDocument>('Quiz', quizSchema);

export default QuizModel;
