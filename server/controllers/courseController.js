import mongoose from 'mongoose';
import Course from '../db/models/Course.js';

const courseController = {};

courseController.getCourses = async (req, res) => 
{
  const courses = await Course.find({});
  res.status(200).send(courses);
}

export default courseController;