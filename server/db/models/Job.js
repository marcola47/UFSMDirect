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
    type: [{ type: String, ref: "Course" }],
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

