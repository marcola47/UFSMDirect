import mongoose from 'mongoose';
import idSchema from './_id.js';

const feedbackSchema = new mongoose.Schema(
{
  id: idSchema,

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

  type:
  {
    type: Boolean,
    required: true,
    default: false
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

export default mongoose.model('Feedback', feedbackSchema);