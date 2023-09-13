import mongoose from 'mongoose';
import Affirmation from '../db/models/Affirmation.js';

const formController = {};

formController.getAffirmations = async (req, res) => 
{
  try 
  {
    const affirmations = await Affirmation.find({}).lean().select('-_id -__v');
    res.status(200).send(affirmations);
  }

  catch (error)
  {
    console.log(error)
    res.status(500).send(
    {
      header: "Failed to get affirmations",
      message: "Internal server error on getting affirmations"
    })
  }
}

export default formController;