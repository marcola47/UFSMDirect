import mongoose from 'mongoose';
import Job from '../db/models/Job.js';
import Course from '../db/models/Course.js';
import Program from '../db/models/Program.js';
import Importance from '../db/models/Importance.js'

const jobController = {};

jobController.getJobs = async (req, res) => 
{
  const jobs = await Job.find({ active: true }).select('-_id -__v');
  res.status(200).send(jobs);
}

jobController.rankPrograms = async (req, res) =>
{
  // job course in program course
	//   check if master is in job

  // yes: importance = workload * value 
  //   sum += importance

  const { jobID } = req.params;
  const courses = await Course.find({});
  const programs = await Program.find({});
  const importances = await Importance.find({ job: jobID });

  
  let score = 0;

  courses.forEach

  res.sendStatus(200)
}

export default jobController;