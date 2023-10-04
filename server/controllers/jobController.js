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

  programs.forEach(program => 
  {
    program.score = 0;
    const courseScores = courses.map(course => { return { id: course.id, score: 0, total: 0 } });

    importances.forEach(importance => 
    {
      const programCourse = program.courses.find(course => course.id === importance.course);

      if (programCourse)
      {
        const course = courses.find(course => course.id === importance.course);
        
        const score = course.mandatory
        ? importance.value * course.workload
        : importance.value * course.workload * 0.8
    
        courseScores.map(courseScore => 
        {
          if (courseScore.id === importance.course)
          {
            courseScore.score += score;
            courseScore.total++;
          }
        })
      }
    })

    courseScores.forEach(courseScore => 
    {
      if (courseScore.total > 0)
      {
        courseScore.avg = courseScore.score / courseScore.total;
        program.score += courseScore.avg;
      }
    })

    const mandatoryTotal = program.courses.filter(course => course.mandatory === true).length;
    const calculationTotal = (program.courses.length + mandatoryTotal) / 2;

    program.score = Math.round(program.score / calculationTotal);
  })

  const programsRanked = programs.map(program => 
  { 
    return { 
      id: program.id,
      name: program.name, 
      score: program.score / Math.max(...programs.map(program => program.score))
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