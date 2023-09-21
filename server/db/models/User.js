import mongoose from 'mongoose';
import idSchema from './_id.js';
import paramsSchema from './_params.js'

const userAffirmationSchema = new mongoose.Schema(
{
  id:
  {
    type: String,
    ref: 'Affirmation',
    required: true,
  },

  answer:
  {
    type: String,
    enum: 
    [
      'completely disagree', 
      'strongly disagree', 
      'somewhat disagree',
      'not sure',
      'somewhat agree',
      'strongly agree',
      'completely agree'
    ],
    default: 'not sure',
    required: true
  }
});

const userSchema = new mongoose.Schema(
{
  id: idSchema,
  params: paramsSchema,

  verified: {
    type: Boolean,
    required: true,
    default: false
  },

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

  affirmations: 
  {
    type: [userAffirmationSchema],
    default: null,
    required: false
  },

  registration:
  {
    type: Number,
    default: null,
    required: false,
    maxlength: 16
  },

  program:
  {
    type: String,
    ref: 'Program',
    default: null,
    required: false
  },

  job:
  {
    type: String,
    ref: 'Job',
    default: null,
    required: false
  }
});

userSchema.methods.generateVerificationToken = function() {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

export default mongoose.model('User', userSchema);
