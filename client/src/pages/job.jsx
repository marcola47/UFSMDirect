import { useParams } from 'react-router-dom'

import Navbar from '@/components/navbar/navbar'
import Job from '@/components/job/job'

export default function JobPage()
{
  const { jobID } = useParams();

  return (
    <>
      <Navbar/>
      <Job jobID={ jobID }/>
    </>
  )
}