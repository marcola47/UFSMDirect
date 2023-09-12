import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/home';
import FormPage from './pages/form';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

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
        </Routes>
      </div>
    </UserContext.Provider>
  )
}