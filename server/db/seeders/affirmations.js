import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Affirmation from '../../db/models/Affirmation.js';
import affirmations from './affirmations.json' assert { type: "json" };

const seedNuclei = async () =>
{
  await Affirmation.deleteMany({});
  await Affirmation.insertMany(affirmations);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedNuclei().then(() => { mongoose.connection.close() });