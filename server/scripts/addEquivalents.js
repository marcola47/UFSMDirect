import { writeFile } from 'fs/promises';
import importances from '../db/seeders/importances.json' assert { type: "json" };
import courses from '../db/seeders/courses.json' assert { type: "json" };

async function readTextFile() 
{
  try 
  {
    const equivalents = [];

    importances.forEach(importance => 
    {
      const course = courses.find(course => course.id == importance.course);

      if (course.equivalents?.length > 0)
      {
        course.equivalents.forEach(equivalent => 
        {
          if (!importances.find(subimp => subimp.course === equivalent && subimp.job === importance.job && subimp.user === importance.user))
          {
            equivalents.push(
            { 
              job: importance.job,
              course: equivalent,
              user: importance.user,
              value: importance.value, 
            });
          }
        })
      }
    })

    const jsonData = JSON.stringify(equivalents, null, 2);
    await writeFile('./output.json', jsonData, 'utf8');

    console.log('Data written to output.json');
  } 
  
  catch (error) {
    console.error('Error reading the file:', error);
  } 
}

readTextFile();
