import React, { useState, useContext, useEffect } from 'react';
import { UserContext, ReducerContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig';

import formParams from '@/data/formParams.js'
import List from '@/components/utils/list'
import Affirmation from './affirmation/affirmation';

export const AffirmationsContext = React.createContext();

export default function Form()
{
  const { user, setUser } = useContext(UserContext);
  const { dispatch } = useContext(ReducerContext);
  const [affirmations, setAffirmations] = useState([]);
  const [clientParams, setClientParams] = useState(user ? user.params : formParams);

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
    const clientParamsCopy = structuredClone(clientParams);

    // resetar os parametros para evitar acumulo indevido dos multiplicadores
    for (let key in clientParamsCopy)
      if (clientParamsCopy.hasOwnProperty(key))
        clientParamsCopy[key] = 0;

    affirmations.forEach(affirmation => 
    {
      let increment = 0;
      switch(affirmation.answer)
      {
        case 'completely_disagree': increment = -0.3; break;
        case 'strongly_disagree'  : increment = -0.2; break;
        case 'somewhat_disagree'  : increment = -0.1; break;
        case 'somewhat_agree'     : increment =  0.1; break;
        case 'strongly_agree'     : increment =  0.2; break;
        case 'completely_agree'   : increment =  0.3; break;
        default: increment = 0;
      }

      affirmation.params.forEach(param => clientParamsCopy[param] += increment)
    })

    if (user)
    {
      const userOld = structuredClone(user);
      const userCopy = structuredClone(user);
      userCopy.params = clientParamsCopy;
  
      setUser(userCopy);
      axios.post('/a/user/update/params', 
      {
        userID: userCopy.id,
        params: userCopy.params
      })
      .catch(err => 
      {
        setResponseError(err, dispatch);
        setUser(userOld);
      })
    }

    setClientParams(clientParamsCopy);
    console.log(clientParamsCopy);
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