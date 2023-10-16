import mongoose from 'mongoose';
import Program from '../db/models/Program.js';

const programController = {};



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