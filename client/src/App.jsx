import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import '@/css/app.css';

import HomePage from './pages/home';
import FormPage from './pages/form';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Error404Page from './pages/404';

export const UserContext = React.createContext();

export default function App() 
{
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/form" element={ <FormPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/register" element={ <RegisterPage/> }/>
          <Route path="*" element={ <Error404Page/> }/>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}