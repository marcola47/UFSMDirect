import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosConfig'

import getTextColor from '@/utils/getTextColor';
import List from '../utils/list';

export default function Job({ jobID })
{
  const [job, setJob] = useState(null);

  const grids = 
  [
    ["1 / 1 / 2 / 3", "1 / 3 / 2 / 4", "2 / 2 / 3 / 4", "3 / 1 / 4 / 4", "2 / 1 / 3 / 2"],
    ["1 / 1 / 2 / 2", "1 / 2 / 2 / 4", "2 / 1 / 3 / 3", "2 / 3 / 3 / 4", "3 / 1 / 4 / 4"],
    ["1 / 1 / 2 / 4", "2 / 1 / 3 / 2", "2 / 2 / 3 / 4", "3 / 1 / 4 / 2", "3 / 2 / 4 / 4"],
    ["1 / 1 / 2 / 4", "2 / 1 / 3 / 4", "3 / 1 / 4 / 2", "3 / 2 / 4 / 3", "3 / 3 / 4 / 4"],
    ["1 / 1 / 3 / 2", "1 / 2 / 3 / 3", "1 / 3 / 2 / 4", "2 / 3 / 3 / 4", "3 / 1 / 4 / 4"],
    ["1 / 1 / 2 / 3", "1 / 3 / 3 / 4", "2 / 1 / 3 / 2", "2 / 2 / 3 / 3", "3 / 1 / 4 / 4"],
    ["1 / 1 / 2 / 3", "2 / 1 / 3 / 3", "3 / 1 / 4 / 3", "1 / 3 / 3 / 4", "3 / 3 / 4 / 4"]
  ]

  const bgColors = ["#FFFFFF", "#84CAFF", "#194185"];
  
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

  function GridView({ gridItems })
  {
    function GridItem({ index, itemData, gridIndex })
    {
      const bgColor = bgColors[Math.floor(Math.random() * 3)];
      const color = getTextColor(bgColor); 

      const style = 
      {
        gridArea: grids[gridIndex][index],
        backgroundColor: bgColor,
        color: color
      }

      return (
        <div 
          className='grid__item'
          style={ style }
        >
          <div 
            className="grid__item__name"
            children={ itemData.name }
          />
          <div 
            className="grid__item__desc"
            children={ itemData.description }
          />
        </div>
      )
    }

    const gridIndex = Math.floor(Math.random() * 7);

    return (
      <div className="grid__view">
      { 
        gridItems.map((gridItem, index) => 
        {
          return (
            <GridItem 
              key={ index }
              index={ index } 
              itemData={ gridItem } 
              gridIndex={ gridIndex }
            />
          );
        }) 
      }
      </div>
    );
  }

  useEffect(() => 
  {
    if (!job)
    {
      axios.get(`/g/job/${jobID}`)
      .then(res => setJob(res.data))
      .catch(err => console.log(err))
    }
  }, [])

  if (!job) 
  {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className='job-page'>
      <div 
        className="job-page__name"
        children={ job.name }
      />

      <div 
        className="job-page__desc"
        children={ job.description }
      />

      <List
        className='job-page__programs'
        ids='job-page__programs'
        elements={ job.programs }
        ListItem={ JobProgram }
      />

      <div className="grids">
        <div className="grid" id='grid--responsabilities'>
          <h2 children="PRINCIPAIS RESPONSABILIDADES"/>
          <GridView gridItems={ job.responsabilities }/>
        </div>

        <div className="grid" id='grid--creations'>
          <h2 children="PRINCIPAIS CRIAÇÕES"/>
          <GridView gridItems={ job.creations }/>
        </div>

        <div className="grid" id='grid--companies'>
          <h2 children="PRINCIPAIS EMPRESAS NO RAMO"/>
          <GridView gridItems={ job.companies }/>
        </div>
      </div>
    </div>
  )
}