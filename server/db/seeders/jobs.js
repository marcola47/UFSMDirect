import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Job from '../../db/models/Job.js';
import jobs from './jobs.json' assert { type: "json" };

const seedJobs = async () =>
{
  await Job.deleteMany({});
  await Job.insertMany(jobs);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedJobs().then(() => { mongoose.connection.close() });