import mongoose from 'mongoose';

const difficultySchema = new mongoose.Schema(
{
  user:
  {
    type: String,
    ref: 'User',
    required: true
  },

  course:
  {
    type: String,
    ref: 'Course',
    required: true
  },

  value:
  {
    type: Number,
    required: true,
    default: 10
  },

  created_at:
  {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Difficulty', difficultySchema);