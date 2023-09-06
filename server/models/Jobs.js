import mongoose from "mongoose";
import idSchema from "./_id.js";

const jobSchema = new mongoose.Schema(
{
  id: idSchema,

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
    required: true,
    default: []
  },
});

export default mongoose.model("Job", jobSchema);

