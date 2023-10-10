import React, { useState, useContext, useEffect } from 'react';
import { JobsContext } from '../jobs';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import List from '@/components/utils/list';

function JobProgram({ itemData: program })
{
  const navigate = useNavigate();

  return (
    <div 
      className="program"
      onClick={ () => {navigate(`/program/${program.id}`)  } }
    >
      <div className="program__content">
        <div 
          className="program__comp"
          children={ `${Math.round(program.score * 100)}%` }
        />

        <div 
          className="program__name"
          children={ program.name }
        />
      </div>

      <div className="program__progress">
        <span style={{ width: `${program.score * 100}%` }} />
      </div>
    </div>
  )
}

function JobListItem({ itemData })
{
  return (
    <div className="job__item">
      <div className="job__item__decorator"/>
      
      <div 
        className="job__item__name"
        children={ itemData.name }
      />
    </div>
  )
}

export default function Job({ itemData: job })
{
  const { jobs, setJobs } = useContext(JobsContext);
  const [isHidden, setIsHidden] = useState(true)
  const navigate = useNavigate();

  useEffect(() => 
  {
    if (!job.programs && !isHidden)
    {
      axios.get(`/g/job/${job.id}/rank-programs`)
      .then(res => 
      {
        const jobsCopy = structuredClone(jobs);
        jobsCopy.map(listJob => 
        {
          if (listJob.id === job.id)
            listJob.programs = res.data;

          return listJob;
        })

        setJobs(jobsCopy);
      })
    }
  }, [isHidden])

  return (
    <div className='job'>
      <div 
        className="job__main"
        onClick={ ()=> {setIsHidden(!isHidden)} }
      >        
        <div 
          className="job__name"
          children={ job.name }
          onClick={() => navigate(`/job/${job.id}`)}
        />

        <div 
          className="job__toggle"
          style={{ transform: `rotate(${isHidden ? 180 : 0}deg)` }}
          onClick={ ()=> {setIsHidden(!isHidden)} }
          children={ <FontAwesomeIcon icon={ faChevronUp } /> }
        />
      </div>

      {
        !isHidden && job.programs && job.responsabilities && job.companies &&
        <div className="job__sub">
          <div 
            className="job__desc"
            children={ job.description }
          />

          <div className="job__infos">
            <div className="job__info job__programs">
              <div 
                className="job__info__header"
                children="CURSOS MAIS COMPATÍVEIS"
              />
              <List
                className='job__info__list programs__list'
                ids={`${job.id}:programs`}
                elements={ job.programs }
                ListItem={ JobProgram }
              />
            </div>

            <div className="job__info job__companies">
              <div 
                className="job__info__header"
                children="EMPRESAS NO RAMO"
              />
              <List
                className='job__info__list companies__list'
                ids={`${job.id}:companies`}
                elements={ job.companies }
                ListItem={ JobListItem }
              />
            </div>

            <div className="job__info job__responsabilities">
              <div 
                className="job__info__header"
                children="RESPONSABILIDADES"
              />
              <List
                className='job__info__list responsabilities__list'
                ids={`${job.id}:responsabilities`}
                elements={ job.responsabilities }
                ListItem={ JobListItem }
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
}