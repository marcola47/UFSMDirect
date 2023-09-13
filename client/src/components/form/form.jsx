import React, { useState, useContext, useEffect } from 'react';
import { ReducerContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig';

import List from '@/components/utils/list'
import Affirmation from "./affirmation/affirmation";

export const AffirmationsContext = React.createContext();

export default function Form()
{
  const { dispatch } = useContext(ReducerContext);
  const [affirmations, setAffirmations] = useState([]);

  useEffect(() => 
  {  
    if (affirmations.length <= 0)
    {
      axios.get('/g/form/getAffirmations')
      .then(res => setAffirmations(res.data))
      .catch(err => setResponseError(err, dispatch))
    }
  }, [])

  function handleFormSubmit()
  {
    console.log('brah');
    return true;
  }

  return (
    <div className="form">
      <AffirmationsContext.Provider value={{ affirmations, setAffirmations }}>
        <List
          className="form__affirmations"
          items={ affirmations }
          elements={ affirmations }
          ListItem={ Affirmation }
        />
      </AffirmationsContext.Provider>

      <div 
        className="form__submit"
        onClick={ handleFormSubmit }
        children="FINALIZAR"
      />
    </div>
  )
}