import { useState, useContext, useEffect } from "react"
import { UserContext } from "@/app"

import List from "../list/list";

export default function RateCourseModal() {
  const [courseListShown, setCourseListShown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);


  function ListCourse({ itemData: course })
  {
    const courseSelected = course.id === selectedCourse?.id;

    function selectCourse()
    {
      setSelectedCourse(course); 
      setCourseListShown(false)
    }

    return (
      <div
        className={`course ${courseSelected ? 'course--selected' : ''}`}
        onClick={ selectCourse }
        children={ course.name }
      />
    )
  }


  return (
    <div className="modal-bg">
      <div className="rate">
        <h1 className="rate__header">
          AVALIE A IMPORTÂNCIA DESTA DISCIPLINA
        </h1>

        <div 
          className="register__input register__input__program"
          onClick={ () => setCourseListShown(!programsListShown) }
        >            
          <div 
            className='register__inputs__program'
            children={ selectedProgram?.name || 'Curso' }
          />

          <FontAwesomeIcon icon={ faGraduationCap }/> 
          <FontAwesomeIcon icon={ faChevronDown }/>

          {
            programsListShown && programs.length > 0 &&
            <List
              className="program__list"
              ids="program__list"
              elements={ programs }
              ListItem={ ListProgram }
            />
          }
        </div>
      </div>
    </div>
  )
}