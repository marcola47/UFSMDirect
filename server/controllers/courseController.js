import mongoose from 'mongoose';
import Course from '../db/models/Course.js';

const courseController = {};

courseController.getCourses = async (req, res) => 
{
  const courses = await Course.find({}).select('-_id -__v');
  res.status(200).send(courses);
}


courseController.getCourse = async (req, res) => {
  const course = await Course.findOne({ id: req.params.id }).select('-_id -__v');
  res.status(200).send(course);
}


export default courseController;