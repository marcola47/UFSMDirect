import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Difficulty from '../../db/models/Difficulty.js';
import difficulties from './difficulties.json' assert { type: "json" };

const seedDifficulties = async () =>
{
  await Difficulty.deleteMany({});
  await Difficulty.insertMany(difficulties);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedDifficulties().then(() => { mongoose.connection.close() });
