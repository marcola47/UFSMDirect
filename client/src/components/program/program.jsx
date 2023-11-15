import { useState, useEffect, useContext } from 'react';
import { ReducerContext, UserContext } from '@/app';
import axios, { setResponseError } from '@/utils/axiosConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import List from '@/components/utils/list/list'

export default function Program({ programID }) {
  const [program, setProgram] = useState(null);

  useEffect(() => {
    axios.get(`/g/program/${programID}`)
    .then(res => setProgram(res.data))
    .catch(err => setResponseError(err, dispatch))
  }, [])

  function ProgramJob({ itemData: job }) {
    return (
      <div 
        className="job"
        onClick={ () => {navigate(`/job/${job.id}`)  } }
      >
        <div className="job__content">
          <div 
            className="job__comp"
            children={ `${Math.round(job.score * 100)}%` }
          />

          <div 
            className="job__name"
            children={ job.name }
          />
        </div>

        <div className="job__progress">
          <span style={{ width: `${job.score * 100}%` }} />
        </div>
      </div>
    )
  }

  function ProgramCourse({ itemData: course }) {
    const [isHidden, setIsHidden] = useState(true);
    const { dispatch } = useContext(ReducerContext);
    const { user } = useContext(UserContext);

    function openRatingModal() {
      dispatch({ type: 'toggle_rate_course' });
      dispatch({ 
        type: 'set_rate_course_data', 
        payload: course.id
      });
    }
  
    return (
      <div className={`course ${course.mandatory ? '' : 'course--optional'}`}>
        <div 
          className="course__main"
          onClick={ () => {setIsHidden(!isHidden)} }
        >        
          <div 
            className="course__name"
            children={ course.name }
          />
  
          {
            user?.id &&
            <div 
              className="course__rate"
              onClick={ openRatingModal }
              children={ <FontAwesomeIcon icon={ faStar } /> }
            />
          }

          <div 
            className="course__toggle"
            style={{ transform: `rotate(${isHidden ? 180 : 0}deg)` }}
            onClick={ () => {setIsHidden(!isHidden)} }
            children={ <FontAwesomeIcon icon={ faChevronUp } /> }
          />
        </div>
  
        {
          !isHidden && course.description &&
          <>
            <div className="course__sub">
              <div 
                className="course__desc"
                children={ course.description }
              />
            </div>
          </>
        }
      </div>
    )
  }
  
  function SemesterCourses({ semester }) {
    return (
      <div className='program-page__semester'>
        {
          semester !== 0 
          ? <h3 
              className='program-page__label'
              children={`${semester}° Semestre`}
            />

          : <h3 
              className='program-page__label'
              children={`Qualquer Semestre`}
            />
        }
        <List
          className='program-page__courses'
          ids={`list:program:${semester}`}
          elements={ program.courses.filter(course => course.semester === semester) }
          ListItem={ ProgramCourse }
        />
      </div>
    )
  }

  if (!program)
    return <div>loading...</div>

  const paragraphs = program.description.split('<br/>');
  const semesterNumbers = Array.from({ length: program.duration }, (_, index) => index + 1);
  semesterNumbers.push(0);

  return (
    <div className="program-page">
      <div className="program-page__hero">
        <img 
          src={`/img/program_arts/${program.art}`} 
          alt="art"
          className="info__art" 
        />
        <div className="program-page__content">
          <h1 
            className="program-page__name"
            children={ program.name }
          />
          <div className="program-page__duration">
            <span>Duração: </span>
            <span className='hl-blue'>{ program.duration } Semestres </span>
            <span className='hl-blue'> | { program.duration / 2 } Anos</span>
          </div>

          <p className="program-page__desc">
            { paragraphs.map((paragraph, index) => { return <span className='paragraph' key={ index }>{ paragraph }</span> }) }
          </p>
        </div>
      </div>

      <h1 
        className="program-page__header"
        children="CARREIRAS MAIS COMPATÍVEIS"
      />

      <List 
        className='program-page__jobs'
        ids={`list:program:${program.id}`}
        elements={ program?.jobs.slice(0, 10) }
        ListItem={ ProgramJob }
      />
  
      <h1 
        className="program-page__header"
        children="ESTRUTURA CURRICULAR"
      />
 
      {
        semesterNumbers.map(semester => {
          return <SemesterCourses key={ semester } semester={ semester } />
        })
      }
    </div>
  )
}