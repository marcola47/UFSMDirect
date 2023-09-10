import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import Chat from '../../db/models/Chat.js';
import chats from './chats.json' assert { type: "json" };

const seedChats = async () =>
{
  await Chat.deleteMany({});
  await Chat.insertMany(chats);
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedChats().then(() => { mongoose.connection.close() });