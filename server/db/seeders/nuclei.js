import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Nucleus from '../../db/models/Nucleus.js';
import nuclei from './nuclei.json' assert { type: "json" };

const seedNuclei = async () =>
{
  await Nucleus.deleteMany({});
  await Nucleus.insertMany(nuclei);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedNuclei().then(() => { mongoose.connection.close() });