import mongoose from 'mongoose';
import idSchema from './_id.js';

const courseSchema = new mongoose.Schema(
{
  id: idSchema,

  ufsm_code:
  {
    type: String,
    default: null,
    required: false,
    maxlength: 16
  },

  name:
  {
    type: String,
    default: 'New Course',
    required: true,
    maxlength: 128,
    trim: true
  },

  description:
  {
    type: String,
    default: 'New Course Description',
    required: true,
    maxlength: 2048,
    trim: true
  },

  workload:
  {
    type: Number,
    default: 0,
    required: true
  },

  equivalents:
  {
    type: [String],
    ref: 'Course',
    default: [],
    required: false
  }
}, { strict: false });

export default mongoose.model('Course', courseSchema);