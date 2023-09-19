import { useContext, useRef } from 'react';
import { UserContext, ReducerContext } from '@/app';
import { useNavigate } from 'react-router-dom';
import axios, { setResponseError } from '@/utils/axiosConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

export default function Login()
{
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const { dispatch } = useContext(ReducerContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function login()
  {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clientError = 
    {
      clientSide: true,
      header: "Failed to login",
      message: ""
    }

    if (email === '' || !emailRegex.test(email))
    {
      clientError.message = "Email format not accepted";
      setResponseError(clientError, dispatch)
      return;
    }
    
    if (password === '' || password.length < 8)
    {
      clientError.message = "Your password must be atleast 8 characters long";
      setResponseError(clientError, dispatch)
      return;
    }

    axios.post(`/g/user/login`, 
    { 
      email: email, 
      password: password 
    })
    .then(res => 
    {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      
      setUser(res.data.result);
      navigate('/');
    })
    .catch(err => setResponseError(err, dispatch))
  }

  return (
    <div className="login">
      <img 
        src="img/logo--icon--lm.png" 
        alt="logo" 
        className="login__logo" 
      />

      <div className="login__form">
        <div 
          className="login__welcome"
          children="SEJA BEM-VINDO AO UFSMDirect!"
        />
        
        <div className="login__inputs">
          <div className="login__input">
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input 
              type="email" 
              ref={ emailRef } 
              name="email" 
              id="email" 
              placeholder="Email"
            />
          </div>

          <div className="login__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordRef } 
              name="password" 
              id="password" 
              placeholder="Senha" 
            />
          </div>

          <p 
            className='login__navigate' 
            onClick={ () => {navigate('/register')} }
            children="Ainda não possui uma conta? Clique aqui!"
          />
        </div>

        <button 
          className="login__auth" 
          onClick={ login }
          children="LOGIN"
        />
      </div>
    </div>
  )
}