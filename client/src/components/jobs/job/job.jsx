import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, /*faGear, faTerminal, faClipboard, faServer, faObjectGroup, faListCheck, faDatabase*/ } from '@fortawesome/free-solid-svg-icons';

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
          children={ `${program.compatibility * 100}%` }
        />

        <div 
          className="program__name"
          children={ program.name }
        />
      </div>

      <div className="program__progress">
        <span style={{ width: `${program.compatibility * 100}%` }} />
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

  const programs =
  [
    { id: 0, name: 'Sistemas de Informação', compatibility: 0.87 },
    { id: 1, name: 'Ciência da Computação', compatibility: 0.82 },
    { id: 2, name: 'Tecnologia em Sistemas para Internet', compatibility: 0.75 },
    { id: 3, name: 'Redes de Computadores', compatibility: 0.62 },
    { id: 4, name: 'Engenharia da Computação', compatibility: 0.42 },
    { id: 5, name: 'Engenharia de Automação e Controle', compatibility: 0.23 }
  ]

  const [isHidden, setIsHidden] = useState(true)
  const navigate = useNavigate();

  return (
    <div className='job'>
      <div className="job__main">
        {/* <div 
          className="job__icon"
          children={ <FontAwesomeIcon icon={ faTerminal }/> }
        /> */}
        
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
        !isHidden &&
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