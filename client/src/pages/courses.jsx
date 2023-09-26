import { useState, useEffect } from 'react';
import axios from '@/utils/axiosConfig';

import Navbar from '@/components/navbar/navbar';
import Courses from '@/components/courses/courses';

export default function CoursesPage() 
{
  return (
    <>
      <Navbar />
      <Courses />
    </>
  )
}