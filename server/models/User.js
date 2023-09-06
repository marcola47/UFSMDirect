import mongoose from 'mongoose';
import idSchema from './_id.js';

const userSchema = new mongoose.Schema(
{
  id: idSchema,

  name: 
  {
    type: String,
    default: 'New User',
    required: true,
    maxlength: 128,
    trim: true
  },

  email: 
  {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address.']
  },

  password:
  {
    type: String,
    required: true,
    minlength: 8
  },

  bio:
  {
    type: String,
    default: 'New User Bio',
    required: false,
    trim: true,
    maxlength: 512
  },

  registration:
  {
    type: Number,
    default: null,
    required: false,
    maxlength: 32
  },

  program:
  {
    type: String,
    ref: 'Program',
    default: null,
    required: false
  }
});

export default mongoose.model('User', userSchema);
