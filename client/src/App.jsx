import React, { useState, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from '@/utils/axiosConfig';

import '@/css/app.css';

import HomePage from './pages/home';
import FormPage from './pages/form';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Error404Page from './pages/404';

export const UserContext = React.createContext();
export const ReducerContext = React.createContext();

export default function App() 
{
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

      else if (location.pathname !== '/register' && location.pathname !== '/login')
        navigate('/login')
    }
  }

  useEffect(() => { fetchUser(); console.log(user) }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReducerContext.Provider value={{ state, dispatch }}>
        <div className="app">
          <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/form" element={ <FormPage/> }/>
            <Route path="/login" element={ <LoginPage/> }/>
            <Route path="/register" element={ <RegisterPage/> }/>
            <Route path="*" element={ <Error404Page/> }/>
          </Routes>
        </div>
      </ReducerContext.Provider>
    </UserContext.Provider>
  )
}