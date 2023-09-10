import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Course from '../../db/models/Course.js';
import courses from './courses.json' assert { type: "json" };

const seedCourses = async () =>
{
  await Course.deleteMany({});
  await Course.insertMany(courses);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedCourses().then(() => { mongoose.connection.close() });