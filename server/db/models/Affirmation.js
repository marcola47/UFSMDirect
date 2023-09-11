import mongoose from 'mongoose';
import idSchema from './_id.js';

const affirmationSchema = new mongoose.Schema(
{
  id: idSchema,

  content:
  {
    type: String,
    required: true,
    maxlength: 512,
  },

  params:
  {
    type: [String],
    required: true,
    maxlength: 16,
  }
});

export default mongoose.model('Affirmation', affirmationSchema);