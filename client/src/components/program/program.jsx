import { useState, useEffect, useContext } from 'react';
import { ReducerContext } from '@/app';
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
  } ,[])

  function ProgramCourse({ itemData: course }) {
    const [isHidden, setIsHidden] = useState(true);
    const { dispatch } = useContext(ReducerContext);

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
  
          <div 
            className="course__rate"
            onClick={ openRatingModal }
            children={ <FontAwesomeIcon icon={ faStar } /> }
          />

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
      <div className='program__semester'>
        {
          semester !== 0 
          ? <h3 
              className='program__label'
              children={`${semester}° Semestre`}
            />

          : <h3 
              className='program__label'
              children={`Qualquer Semestre`}
            />
        }
        <List
          className='program__courses'
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
    <div className="program">
      <div className="program__hero">
        <img 
          src={`/img/program_arts/${program.art}`} 
          alt="art"
          className="info__art" 
        />
        <div className="program__content">
          <h1 
            className="program__name"
            children={ program.name }
          />
          <div className="program__duration">
            <span>Duração: </span>
            <span className='hl-blue'>{ program.duration } Semestres </span>
            <span className='hl-blue'> | { program.duration / 2 } Anos</span>
          </div>

          <p className="program__desc">
            { paragraphs.map((paragraph, index) => { return <span className='paragraph' key={ index }>{ paragraph }</span> }) }
          </p>
        </div>
      </div>

      <h1 
        className="program__header"
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