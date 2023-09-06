import mongoose from 'mongoose';
import idSchema from './_id.js';

// obs: será mostrada toda a árvore de pré-requisitos em todos os cursos, 
// ofuscando as disciplinas que o curso não oferece

const nucleusCourseSchema = new mongoose.Schema(
{
  id:
  {
    type: String,
    ref: 'Course',
    required: true
  },

  prior:
  [
    {
      type: String,
      ref: 'Course',
      required: true
    }
  ]

  // somente anteriores de um nível
  // ex certo: proj 2 -> proj 1
  // ex certo: ed -> lab 1 e la 
  // ex errado: paradigmas -> ed, lab 2, la, lab 1
});

const nucleusSchema = new mongoose.Schema(
{
  id: idSchema,

  name:
  {
    type: String,
    default: 'New Nucleus',
    required: true,
    maxlength: 128,
    trim: true
  },

  description:
  {
    type: String,
    default: 'New Nucleus Description',
    required: true,
    maxlength: 1024,
    trim: true
  },

  courses:
  {
    type: [nucleusCourseSchema],
    default: [],
    required: true,
    maxlength: 64
  },
});

export default mongoose.model('Nucleus', nucleusSchema);