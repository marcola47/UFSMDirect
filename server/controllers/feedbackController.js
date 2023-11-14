import mongoose from 'mongoose';
import Importance from "../db/models/Importance.js";
import Course from "../db/models/Course.js";

const feedbackController = {};

feedbackController.rateCourse = async (req, res) => {
  try {
    const { courseID, jobID, userID, rating } = req.body;
    const targetCourse = await Course.findOne({ id: courseID });
    const equivalents = [];

    if (targetCourse.master) { 
      const masterCourse = await Course.findOne({ id: targetCourse.master });
      masterCourse.equivalents.map(equivalent => { equivalents.push(equivalent) })
      equivalents.push(masterCourse.id);
    }

    else if (targetCourse.equivalents && targetCourse?.equivalents.length > 0) {
      targetCourse.equivalents.map(equivalent => { equivalents.push(equivalent) })
      equivalents.push(courseID);
    }

    else
      equivalents.push(courseID);

    equivalents.map(async equivalent => {
      const existingImportance = await Importance.findOne({ user: userID, job: jobID, course: equivalent });

      if (existingImportance) 
        await Importance.findOneAndUpdate({ user: userID, job: jobID, course: equivalent }, { value: rating });
      
      else {
        await Importance.create({
          user: userID,
          job: jobID,
          course: equivalent,
          value: rating
        
        })
      }
    })
    
    res.sendStatus(200);
  }

  catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
}

export default feedbackController;