import { useState } from 'react';
import axios from '@/utils/axiosConfig';

export default function HomePage() 
{
  const [courses, setCourses] = useState([]);
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}