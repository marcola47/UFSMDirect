import mongoose from 'mongoose';
import idSchema from './_id.js';
import paramsSchema from './_params.js'

const programCourseSchema = new mongoose.Schema(
{
  id: 
  {
    type: String,
    ref: 'Course',
    required: true
  },

  semester:
  {
    type: Number,
    required: true,
  },

  mandatory:
  {
    type: Boolean,
    dafault: true,
    required: true
  }
});

const programSchema = new mongoose.Schema(
{
  id: idSchema,

  name: 
  {
    type: String,
    default: 'New Program',
    required: true,
    maxlength: 128,
    trim: true
  },

  description:
  {
    type: String,
    default: 'New Program Description',
    required: true,
    maxlength: 2048,
    trim: true
  },

  art:
  {
    type: String,
    required: false,
    maxlength: 16
  },

  type:
  {
    type: String,
    enum: ['bachelor', 'technologist'],
    default: 'bachelor',
    required: true
  },

  courses:
  {
    type: [programCourseSchema],
    default: [],
    required: true,
    maxlength: 256
  },

  nuclui: 
  {
    type: [{ type: String, ref: 'Nucleus' }],
    default: [],
    required: true,
    maxlength: 64
  },

  // relação entre cursos e areas de atução serão calculadas com base nas disciplinas
  // sem necessidade guardar no banco de dados
});

export default mongoose.model('Program', programSchema);