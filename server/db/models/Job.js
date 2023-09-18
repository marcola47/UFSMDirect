import mongoose from "mongoose";
import idSchema from "./_id.js";
import paramsSchema from "./_params.js";

const subSchema = new mongoose.Schema(
{
  name:
  {
    type: String,
    required: false,
    maxlength: 128,
    trim: true
  },
  
  description:
  {
    type: String,
    required: false,
    maxlength: 1024,
    trim: true
  }
});

const jobCourseSchema = new mongoose.Schema(
{
  id: 
  {
    type: String,
    ref: 'Course',
    required: true
  },

  importance:
  {
    type: Number,
    default: 1,
    required: true,
    min: 1,
    max: 10
  }
});

const jobSchema = new mongoose.Schema(
{
  id: idSchema,
  params: paramsSchema,

  name:
  {
    type: String,
    required: true,
    default: "New Job",
    maxlength: 128,
    trim: true
  },

  description:
  {
    type: String,
    required: true,
    default: "New Job",
    maxlength: 1024,
    trim: true
  },

  courses:
  {
    type: [jobCourseSchema],
    default: [],
    required: true,
    maxlength: 256,
  },

  roles:
  {
    type: [subSchema],
    default: [],
    required: true,
  },

  responsabilities:
  {
    type: [subSchema],
    default: [],
    required: true,
  },

  companies: 
  {
    type: [subSchema],
    default: [],
    required: true,
  },

  // ideia futura: hard e soft skills
});

export default mongoose.model("Job", jobSchema);

