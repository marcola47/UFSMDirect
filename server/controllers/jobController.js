import mongoose from 'mongoose';
import Job from '../db/models/Job.js';

const jobController = {};

jobController.getJobs = async (req, res) => 
{
  const jobs = await Job.find({ active: true }).select('-_id -__v');
  res.status(200).send(jobs);
}

export default jobController;