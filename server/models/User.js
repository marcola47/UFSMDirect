import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
  name: 
  {
    type: String,
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

  registration:
  {
    type: Number,
    required: true,
    maxlength: 32
  },

  program:
  {
    type: String,
  }
});

export default mongoose.model('User', userSchema);
