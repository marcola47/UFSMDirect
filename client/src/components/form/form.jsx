import { useState, useEffect } from 'react';
import axios from 'utils/axiosConfig';

import { List } from 'components/utils/list/list'
import Affirmation from "./affirmation/affirmation";

export default function Form()
{
  const [params, setParams] = useState({});
  const [affirmations, setAffirmations] = useState([]);

  useEffect(() => 
  {
     
  }, []);

  return (
    <div className="form">

    </div>
  )
}