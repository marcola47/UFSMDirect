import mongoose from 'mongoose';
import idSchema from './_id.js';

const chatSchema = new mongoose.Schema(
{
  id: idSchema,
  
  from:
  {
    type: String,
    ref: 'User',
    required: true
  },

  to:
  {
    type: String,
    ref: 'User',
    required: true
  },

  content:
  {
    type: String,
    default: 'New Message',
    required: true,
    maxlength: 1024,
  },

  created_at:
  {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Chat', chatSchema);