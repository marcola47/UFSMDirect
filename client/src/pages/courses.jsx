import { useState, useEffect } from 'react';
import axios from '@/utils/axiosConfig';

export default function CoursesPage() 
{
  const [courses, setCourses] = useState([]);
  
  useEffect(() => 
  {
    if (courses.length === 0)
    {
      axios.get('/g/course/getCourses')
      .then(res => 
      {
        const courses = res.data;
        const duplicates = [];

        courses.forEach(course => 
        {
          if (course.equivalents.length > 0)
          {
            course.eqObjects = [];

            course.equivalents.forEach(equivalent => 
            {
              const eqObject = courses.find(course => course.id === equivalent)
              course.eqObjects.push(eqObject)
              duplicates.push(equivalent)
            })

            delete course.equivalents;
          }
        })

        const coursesDuplicate = [];
        const coursesUnique = []
        
        courses.forEach(course => 
        {
          if (!duplicates.includes(course.id))
            coursesUnique.push(course)

          else
            coursesDuplicate.push(course)
        })

        setCourses(coursesUnique)
      })
      .catch(err => console.log(err));
    }
  }, [])

  function Course({ course })
  {
    return(
      <li style={{ marginBlock: 16, marginInline: 16 }}>
        <p><span style={{ fontWeight: 600 }}>id:</span> { course.id }</p>
        <p><span style={{ fontWeight: 600 }}>Nome:</span> { course.name }</p>
        {
          course.eqObjects &&
          <>
            <p style={{ fontWeight: 600 }}>Equivalentes:</p>
            <ul>
              {
                course.eqObjects.map(eqObject => 
                {
                  return (
                    <li style={{ marginLeft: 8 }} key={ eqObject.id }>
                      { eqObject.ufsm_code } { eqObject.name }
                    </li>
                  )
                })
              }
            </ul>
          </>
        }
      </li>
    )
  }

  return (
    <ul>
      { 
        courses.length > 0 &&
        courses.map(course => { return <Course key={ course.id } course={ course }/> }) 
      }
    </ul>
  )
}