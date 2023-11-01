import React, { useState, useEffect, useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosConfig';

import '@/css/app.css';

import Error404Page from './pages/404';
import HomePage from './pages/home';
import FormPage from './pages/form';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile';

import JobPage from './pages/job';
import ProgramPage from './pages/program';

import JobsPage from './pages/jobs';
import CoursesPage from './pages/courses';
import ProgramsPage from './pages/programs';
import NucleiPage from './pages/nuclei';

export const UserContext = React.createContext();
export const ReducerContext = React.createContext();

export default function App() 
{
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [state, dispatch] = useReducer(reducer, 
  {

  });
      
  function reducer(state, action)
  {
    switch (action.type)
    {
      default: return state;
    }
  }
  
  function fetchUser()
  {
    if (user === null)
    {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken)
      {
        axios.post(`/a/user/token`, { reqType: 'login' })
        .then(res => setUser(res.data.result))
        .catch(err => 
        {
          navigate('login');
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setResponseError(err, dispatch)
        })
      }
    }
  }

  useEffect(() => { fetchUser() }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReducerContext.Provider value={{ state, dispatch }}>
        <div className="app">
          <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/form" element={ <FormPage/> }/>
            <Route path="/jobs" element={ <JobsPage/> }/>
            <Route path="/login" element={ <LoginPage/> }/>
            <Route path="/nuclei" element={ <NucleiPage/> }/>
            <Route path="/courses" element={ <CoursesPage/> }/>
            <Route path="/profile" element={ <ProfilePage/> }/>
            <Route path="/programs" element={ <ProgramsPage/> }/>
            <Route path="/register" element={ <RegisterPage/> }/>
            <Route path="/job/:jobID" element={ <JobPage/> }/>
            <Route path="/program/:programID" element={ <ProgramPage/> }/>
            <Route path="*" element={ <Error404Page/> }/>
          </Routes>
        </div>
      </ReducerContext.Provider>
    </UserContext.Provider>
  )
}