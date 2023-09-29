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
  const { jobID } = req.params;
  const courses = await Course.find({});
  const programs = await Program.find({});
  const importances = await Importance.find({ job: jobID });

  programs.forEach(program => 
  {
    let score = 0;

    importances.forEach(importance => 
    {
      const programCourse = program.courses.find(course => course.id === importance.course);

      if (programCourse)
      {
        const course = courses.find(course => course.id === importance.course);

        score += importance.value * course.workload;

        if (course.mandatory === false)
          score *= 0.8;
      }
    })

    program.score = Math.round(score / program.courses.length);

    console.log(program);
  })

  res.status(200).send(programs.sort((a, b) => b.score - a.score));
}

export default jobController;