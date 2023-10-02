import mongoose from 'mongoose';
import Job from '../db/models/Job.js';
import Course from '../db/models/Course.js';
import Program from '../db/models/Program.js';
import Importance from '../db/models/Importance.js'

const jobController = {};

jobController.getProgramsComp = async jobID => 
{
  const courses = await Course.find({});
  const programs = await Program.find({});
  const importances = await Importance.find({ job: jobID });

  let totalScore = 0;

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
    totalScore += program.score;
  })

  const maxScore = Math.max(...programs.map(program => program.score));
  
  const programsRanked = programs.map(program => 
  { 
    return { 
      id: program.id,
      name: program.name, 
      score: program.score / maxScore 
    } 
  })

  return programsRanked.sort((a, b) => b.score - a.score);
}

jobController.getJob = async (req, res) =>
{
  try 
  {
    const { jobID } = req.params;
    const job = await Job.findOne({ id: jobID }).lean().select('-_id -__v');
    const rankedPrograms = await jobController.getProgramsComp(jobID);

    job.programs = rankedPrograms;
    res.status(200).send(job);
  }

  catch (error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}

jobController.getJobs = async (_, res) =>
{
  try 
  {
    const jobs = await Job.find({}).lean().select('-_id -__v');
    res.status(200).send(jobs);
  }

  catch (error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}

jobController.rankPrograms = async (req, res) =>
{
  const { jobID } = req.params;
  const programsRanked = await jobController.getProgramsComp(jobID);
  res.status(200).send(programsRanked);
}

export default jobController;