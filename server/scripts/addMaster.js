import { readFile, writeFile } from 'fs/promises';
import courses from '../db/seeders/courses.json' assert { type: "json" };

courses.forEach(course => 
{
  if (course.equivalents)
  {
    course.equivalents.forEach(equivalent =>
    {
      const equivalentCourse = courses.find(c => c.id === equivalent)
      equivalentCourse.master = course.id;
    })
  }
})

const jsonData = JSON.stringify(courses, null, 2);
await writeFile('./output.json', jsonData, 'utf8');