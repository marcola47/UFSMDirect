import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Testimony from '../../db/models/Testimony.js';
import testimonies from './testimonies.json' assert { type: "json" };

const seedTestimonies = async () =>
{
  await Testimony.deleteMany({});
  await Testimony.insertMany(testimonies);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedTestimonies().then(() => { mongoose.connection.close() });