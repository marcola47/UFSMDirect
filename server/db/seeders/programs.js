import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Program from '../../db/models/Program.js';
import programs from './programs.json' assert { type: "json" };

const seedPrograms = async () =>
{
  await Program.deleteMany({});
  await Program.insertMany(programs);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedPrograms().then(() => { mongoose.connection.close() });