import { useContext } from 'react';
import { ReducerContext } from '@/app';
import { useParams } from 'react-router-dom'

import Navbar from '@/components/navbar/navbar'
import Program from '@/components/program/program'
import RateCourseModal from '@/components/utils/rateCourseModal/rateCourseModal';

export default function ProgramPage()
{
  const { programID } = useParams();
  const { state } = useContext(ReducerContext);

  return (
    <>
      <Navbar/>
      <Program programID={ programID }/>

      {
        state.rateCourseShown &&
        <RateCourseModal/> 
      }
    </>
  )
}