import { useState, useContext, useEffect } from 'react';
import { ReducerContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import List from '@/components/utils/list';
import JobProgram from './program/program'
import JobCompany from './company/company';
import JobResponsability from './responsability/responsability'

function Job({ itemData: job })
{
  const programs =
  [
    { name: 'Sistemas de Informação', compatibility: 0.87 },
    { name: 'Ciência da Computação', compatibility: 0.82 },
    { name: 'Tecnologia em Sistemas para Internet', compatibility: 0.75 },
    { name: 'Redes de Computadores', compatibility: 0.62 },
    { name: 'Engenharia da Computação', compatibility: 0.42 },
    { name: 'Engenharia de Automação e Controle', compatibility: 0.23 }
  ]

  return (
    <div className='job'>
      <div className="job__main">
        <div 
          className="job__name"
          children={ job.name }
        />

        <FontAwesomeIcon icon={ faChevronDown }/>
      </div>

      <div className="job__sub">
        <div 
          className="job__desc"
          children={ job.description }
        />

        <div className="job__info job__programs">
          <div 
            className="job__info__header"
            children="CURSOS MAIS COMPATÍVEIS"
          />
          <List
            className='programs__list'
            ids={`${job.id}:programs`}
            elements={ programs }
            ListItem={ JobProgram }
          />
        </div>

        <div className="job__info job__companies">
          <div 
            className="job__info__header"
            children="EMPRESAS NO RAMO"
          />
          <List
            className='companies__list'
            ids={`${job.id}:companies`}
            elements={ job.companies }
            ListItem={ JobCompany }
          />
        </div>

        <div className="job__info job__responsabilities">
          <div 
            className="job__info__header"
            children="RESPONSABILIDADES"
          />
          <List
            className='responsabilities__list'
            ids={`${job.id}:responsabilities`}
            elements={ job.responsabilities }
            ListItem={ JobResponsability }
          />
        </div>
      </div>
    </div>
  )
}

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