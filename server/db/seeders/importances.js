import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Importance from '../../db/models/Importance.js';
import importances from './importances.json' assert { type: "json" };

const seedImportances = async () =>
{
  await Importance.deleteMany({});
  await Importance.insertMany(importances);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedImportances().then(() => { mongoose.connection.close() });
