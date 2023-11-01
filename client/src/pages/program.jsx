import { useParams } from 'react-router-dom'

import Navbar from '@/components/navbar/navbar'
import Program from '@/components/program/program'

export default function ProgramPage()
{
  const { programID } = useParams();

  return (
    <>
      <Navbar/>
      <Program programID={ programID }/>
    </>
  )
}