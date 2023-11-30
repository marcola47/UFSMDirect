import { useState, useContext, useEffect } from "react"
import { ReducerContext, UserContext } from "@/app"
import axios from "@/utils/axiosConfig";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBriefcase, faNewspaper, faChevronDown, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import List from "../list/list";

export default function RateCourseModal() {
  const { state, dispatch } = useContext(ReducerContext);
  const { user } = useContext(UserContext);

  const [courseListShown, setCourseListShown] = useState(false);
  const [jobListShown, setJobListShown] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(state.rateCourseData);
  const [selectedJob, setSelectedJob] = useState(null);
  const [importance, setImportance] = useState(10);

  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [stars, setStars] = useState([
    { importance: 1, icon: "faStarRegular", className: 'rate__star rate__star--1' },
    { importance: 2, icon: "faStarRegular", className: 'rate__star rate__star--2' },
    { importance: 3, icon: "faStarRegular", className: 'rate__star rate__star--3' },
    { importance: 4, icon: "faStarRegular", className: 'rate__star rate__star--4' },
    { importance: 5, icon: "faStarRegular", className: 'rate__star rate__star--5' },
    { importance: 6, icon: "faStarRegular", className: 'rate__star rate__star--6' },
    { importance: 7, icon: "faStarRegular", className: 'rate__star rate__star--7' },
    { importance: 8, icon: "faStarRegular", className: 'rate__star rate__star--8' },
    { importance: 9, icon: "faStarRegular", className: 'rate__star rate__star--9' },
    { importance: 10, icon: "faStarRegular", className: 'rate__star rate__star--10' },
  ]);

  useEffect(() => {
    axios.get('/g/course/getCourses')
    .then(res => {
      setCourses(res.data);
      setSelectedCourse(res.data.find(course => course.id === state.rateCourseData))
    })
    .catch(err => console.log(err))

    axios.get('/g/job/get-jobs')
    .then(res => setJobs(res.data))
    .catch(err => console.log(err))
  }, [])

  function handleRate() {
    if (!selectedCourse || !selectedJob) 
      return;

    dispatch({ type: 'toggle_rate_course' });
    dispatch({ type: 'set_rate_course_data', payload: null })

    axios.post('/g/feedback/importance/create', {
      courseID: selectedCourse.id,
      jobID: selectedJob.id,
      userID: user.id,
      importance: importance
    })
  }

  function handleSetImportance(importance) {
    const newStars = structuredClone(stars);
    
    for (let i = 0; i < newStars.length; i++) {
      if (newStars[i].importance <= importance) 
        newStars[i].icon = "faStarSolid";

      else 
        newStars[i].icon = "faStarRegular";
    }

    setStars(newStars);
    setImportance(importance);
  }

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

  function ListJob({ itemData: job }) {
    const jobSelected = job.id === selectedJob?.id;

    function selectJob()
    {
      setSelectedJob(job); 
      setJobListShown(false)
    }

    return (
      <div
        className={`job ${jobSelected ? 'job--selected' : ''}`}
        onClick={ selectJob }
        children={ job.name }
      />
    )
  }

  function Star({ itemData }) {
    return (
      <div className="rate__star">
        <FontAwesomeIcon 
          icon={ itemData.icon === "faStarRegular" ? faStarRegular : faStarSolid }
          className={ itemData.className }
          onClick={ () => handleSetImportance(itemData.importance) }
        />
      </div>
    )
  }

  return (
    <div 
      className="modal-bg"
      onClick={ () => {dispatch({ type: "toggle_rate_course" })} }
    >
      <div 
        className="rate"
        onClick={e => { e.stopPropagation() }}
      >
        <FontAwesomeIcon 
          icon={ faXmark } 
          className="rate__close"
          onClick={ ()=> {dispatch({ type: "toggle_rate_course" })} }
        />

        <h1 className="rate__header">
          AVALIE A IMPORTÂNCIA DESTA DISCIPLINA PARA UMA CARREIRA
        </h1>

        <div className="rate__inputs">
          <div 
            className="rate__input rate__input__course"
            onClick={ () => setCourseListShown(!courseListShown) }
          >            
            <div 
              className='rate__input__selected'
              children={ selectedCourse?.name || 'Disciplina' }
            />

            <FontAwesomeIcon icon={ faNewspaper }/> 
            <FontAwesomeIcon icon={ faChevronDown }/>

            {
              courseListShown && courses.length > 0 &&
              <List
                className="course__list"
                ids="course__list"
                elements={ courses }
                ListItem={ ListCourse }
              />
            }
          </div>

          <div 
            className="rate__input rate__input__course"
            onClick={ () => setJobListShown(!jobListShown) }
          >            
            <div 
              className='rate__input__selected'
              children={ selectedJob?.name || 'Carreira' }
            />

            <FontAwesomeIcon icon={ faBriefcase }/> 
            <FontAwesomeIcon icon={ faChevronDown }/>

            {
              jobListShown && jobs.length > 0 &&
              <List
                className="course__list"
                ids="course__list"
                elements={ jobs }
                ListItem={ ListJob }
              />
            }
          </div>

          <List 
            className="rate__stars"
            ids="rate__stars"
            elements={ stars }
            ListItem={ Star }
          />
        </div>

        <div 
          className={`rate__btn ${selectedCourse && selectedJob ? '' : 'rate__btn--disabled'}`}
          onClick={ handleRate }
          children='AVALIAR'
        />

        <img 
          src="/img/coat-of-arms.png" 
          alt="coat-of-arms"
          className='rate__coa' 
        />
      </div>
    </div>
  )
}