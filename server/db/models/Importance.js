import mongoose from 'mongoose';

const importanceSchema = new mongoose.Schema(
{
  job:
  {
    type: String,
    ref: 'Job',
    required: true
  },

  course:
  {
    type: String,
    ref: 'Course',
    required: true
  },

  user:
  {
    type: String,
    ref: 'User',
    default: 'system',
    required: true
  },

  value:
  {
    type: Number,
    default: 10,
    required: true,
    min: 0,
    max: 10
  },

  created_at:
  {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Importance', importanceSchema);