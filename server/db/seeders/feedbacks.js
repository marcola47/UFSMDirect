import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Feedback from '../../db/models/Feedback.js';
import feedbacks from './feedbacks.json' assert { type: "json" };

const seedFeedbacks = async () =>
{
  await Feedback.deleteMany({});
  await Feedback.insertMany(feedbacks);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedFeedbacks().then(() => { mongoose.connection.close() });
