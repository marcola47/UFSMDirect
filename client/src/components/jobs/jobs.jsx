import React, { useState, useContext, useEffect } from 'react';
import { ReducerContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig'

import List from '@/components/utils/list/list'
import Job from './job/job';

export const JobsContext = React.createContext();
export default function Jobs()
{
  const { dispatch } = useContext(ReducerContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => 
  {
    if (jobs.length <= 0)
    {
      axios.get('/g/job/get-jobs')
      .then(res => setJobs(res.data))
      .catch(err => setResponseError(err, dispatch))
    }
  }, [])

  return (
    <div className='jobs'>
      <h1 
        className="jobs__header"
        children="PRINCIPAIS CARREIRAS EM TECNOLOGIA"
      />

      <JobsContext.Provider value={{ jobs, setJobs }}>
        <List
          className='jobs__list'
          ids='jobs__list'
          elements={ jobs }
          ListItem={ Job } 
        />
      </JobsContext.Provider>
    </div>
  )
}