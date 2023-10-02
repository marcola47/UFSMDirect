import mongoose from 'mongoose';
import Program from '../db/models/Program.js';

const programController = {};

programController.getRegPrograms = async (_, res) => 
{
  try 
  {
    const programs = await Program.find({}).lean().select("-_id id name");
    res.status(200).send(programs);
  }

  catch (error)
  {
    console.log(error);
    res.sendStatus(500);
  }
}

export default programController;