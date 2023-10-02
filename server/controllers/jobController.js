import mongoose from 'mongoose';
import Job from '../db/models/Job.js';
import Course from '../db/models/Course.js';
import Program from '../db/models/Program.js';
import Importance from '../db/models/Importance.js'

const jobController = {};

jobController.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ active: true }).select('-_id -__v');
    const courses = await Course.find({});
    const programs = await Program.find({}).lean().select('-_id -__v');
    const importances = await Importance.find({});

    const jobPromises = jobs.map(async (job) => 
    {
      const jobImportances = importances.filter(importance => importance.job === job.id);
      const programsCopy = structuredClone(programs);

      programsCopy.forEach((program) => 
      {
        let score = 0;

        jobImportances.forEach((importance) => 
        {
          const programCourse = program.courses.find((course) => course.id === importance.course);

          if (programCourse) 
          {
            const course = courses.find((course) => course.id === importance.course);

            score += importance.value * course.workload;

            if (course.mandatory === false) score *= 0.8;
          }
        });

        program.score = Math.round(score / program.courses.length);
      });

      const maxScore = Math.max(...programsCopy.map(program => program.score));
      programsCopy.forEach(program => program.compatibility = program.score / maxScore);

      job.programs = programsCopy.map(program => 
      { 
        return { 
          id: program.id, 
          name: program.name, 
          compatibility: program.compatibility 
        } 
      });
      
      return job;
    });

    const populatedJobs = await Promise.all(jobPromises);
    res.status(200).send(populatedJobs);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


jobController.rankPrograms = async (req, res) =>
{
  const { jobID } = req.params;
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

  res.status(200).send(programs.map(program => { return { name: program.name, score: program.score } }).sort((a, b) => b.score - a.score));
}

export default jobController;