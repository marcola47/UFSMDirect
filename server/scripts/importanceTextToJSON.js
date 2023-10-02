import { readFile, writeFile } from 'fs/promises';
import mongoose from 'mongoose';
import Course from '../db/models/Course.js';

import { config } from 'dotenv';
config();

const dbHost = process.env.DB_HOST;
console.log(dbHost);
mongoose.connect(dbHost);

async function readTextFile() 
{
  try 
  {
    const textData = await readFile('./scripts/importances.txt', 'utf8');
    const lines = textData.trim().split('\n');
    const objects = [];

    for (const line of lines) 
    {
      const [value, name] = line.trim().split('_');
      const course = await Course.findOne({ name }).select('id -_id');
      
      if (course &&  parseInt(value) !== 0)
      {
        objects.push(
        { 
          job: "75113a68-98ad-4399-ac87-28e4f823b1cd",
          course: course.id.toString(),
          user: "5fd423e5-e00c-4589-a8e3-8711b7b38477",
          value: parseInt(value), 
        });
      }
    }

    const jsonData = JSON.stringify(objects, null, 2);
    await writeFile('./output.json', jsonData, 'utf8');

    console.log('Data written to output.json');
  } 
  
  catch (error) {
    console.error('Error reading the file:', error);
  } 
  
  finally {
    mongoose.connection.close();
  }
}

readTextFile();