import mongoose from 'mongoose';
import idSchema from './_id.js';

const testimonySchema = new mongoose.Schema(
{
  id: idSchema,

  userID:
  {
    type: String,
    ref: 'User',
    required: true
  },
  
  courseID:
  {
    type: String,
    ref: 'Course',
    required: true
  },

  content:
  {
    type: String,
    default: 'New Testimony',
    required: true,
    maxlength: 1024,
    trim: true
  },

  created_at:
  {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Testimony', testimonySchema);
