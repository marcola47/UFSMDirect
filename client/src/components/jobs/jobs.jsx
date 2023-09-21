import { useState, useContext, useEffect } from 'react';
import { ReducerContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig'

import List from '@/components/utils/list';
import Job from './job/job';

export default function Jobs()
{
  const { dispatch } = useContext(ReducerContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => 
  {
    if (jobs.length <= 0)
    {
      axios.get('/g/job/getJobs')
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

      <List
        className='jobs__list'
        ids='jobs__list'
        elements={ jobs }
        ListItem={ Job } 
      />
    </div>
  )
}