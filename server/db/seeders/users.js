import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

import User from '../../db/models/User.js';
import userSeeds from './users.json' assert { type: "json" };

const seedProjects = async () => 
{
  await User.deleteMany({});

  for (const userSeed of userSeeds) 
  {
    const hash = await bcrypt.hash(userSeed.password, 10);

    const user = new User(
    {
      id: userSeed.id,
      picture: userSeed.picture,
      params: userSeed.params,
      name: userSeed.name,
      email: userSeed.email,
      password: hash,
      bio: userSeed.bio,
      registration: userSeed.registration,
      program: userSeed.program,
      job: userSeed.job
    });

    await User.create(user);
  }
};

const dbHost = process.env.DB_HOST;
mongoose.connect(dbHost);
seedProjects().then(() => { mongoose.connection.close() });