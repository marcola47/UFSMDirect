import mongoose from 'mongoose';
import Program from '../db/models/Program.js';
import Course from '../db/models/Course.js';
import Job from '../db/models/Job.js';

import jobController from './jobController.js';
const programController = {};

programController.rankJobs = async programID => {
  const jobs = await Job.find({}).lean();
  const rankedJobs = [];

  for (const job of jobs) {
    const rankedPrograms = await jobController.getProgramsComp(job.id);
    const curProgram = rankedPrograms.find(program => program.id === programID);

    rankedJobs.push({ id: job.id, name: job.name, score: curProgram.score });
  }

  return rankedJobs.filter(job => !isNaN(job.score)).sort((a, b) => b.score - a.score);
}

programController.getProgram = async (req, res) => {
  try {
    const { programID } = req.params;
    const program = await Program.findOne({ id: programID }).lean();
    
    const courseIDs = program.courses.map(course => course.id);
    const courses = await Course.find({ id: { $in: courseIDs } }).lean();

    const idMap = new Map();
    courses.forEach(course => idMap.set(course.id, course));
    const mergedCourses = program.courses.map(course => ({ ...course, ...idMap.get(course.id) }));
    program.courses = mergedCourses;
    program.jobs = await programController.rankJobs(program.id);
    
    res.status(200).send(program);
  }

  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

programController.getMinPrograms = async (req, res) => 
{
  try 
  {
    const { type } = req.query;
    let programs = [];

    if (type === "reg")
      programs = await Program.find({}).lean().select("-_id id name");

    else if (type === "prog")
      programs = await Program.find({}).lean().select("-_id id name description type art");

    else
      throw new Error("Invalid request type");

    res.status(200).send(programs);
  }

  catch (error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}

export default programController;