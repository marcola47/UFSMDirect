import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext, ReducerContext } from '@/app';
import { useNavigate } from 'react-router-dom';
import axios, { setResponseError } from '@/utils/axiosConfig';
import { v4 as uuid } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey, faAddressCard, faGraduationCap, faChevronDown, faCircleDown } from '@fortawesome/free-solid-svg-icons';

import List from '../utils/list';

export default function Register()
{
  const { setUser } = useContext(UserContext);
  const { dispatch } = useContext(ReducerContext);
  
  const [programsListShown, setProgramsListShown] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState();
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  const nameGuestRef = useRef(null);
  const emailGuestRef = useRef(null);
  const passwordGuestRef = useRef(null);
  const passwordGuestConfirmRef = useRef(null);

  const nameAcademicRef = useRef(null);
  const emailAcademicRef = useRef(null);
  const passwordAcademicRef = useRef(null);
  const passwordAcademicConfirmRef = useRef(null);
  const registrationRef = useRef(null);

  useEffect(() => 
  {
    if (programs.length <= 0)
    {
      axios.get('/g/program/get-reg-programs')
      .then(res => setPrograms(res.data))
      .catch(err => setResponseError(err, dispatch))
    }
  }, [])

  function register(type)
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let name, email, password, passwordConfirm, registration, program;

    const clientError = 
    {
      clientSide: true,
      header: "Failed to register",
      message: ""
    }

    if (type === 'academic')
    {
      name = nameAcademicRef.current.value;
      email = emailAcademicRef.current.value.trim();
      password = passwordAcademicRef.current.value;
      passwordConfirm = passwordAcademicConfirmRef.current.value;
      registration = registrationRef.current.value;

      if (registration.length <= 0)
      {
        clientError.message = "Invalid registration";
        setResponseError(clientError, dispatch);
        return;
      }

      if (!email.endsWith('ufsm.br'))
      {
        clientError.message = "Invalid institutional email";
        setResponseError(clientError, dispatch);
        return;
      }
    }

    else
    {
      name = nameGuestRef.current.value;
      email = emailGuestRef.current.value.trim();
      password = passwordGuestRef.current.value;
      passwordConfirm = passwordGuestConfirmRef.current.value;
      registration = registrationRef.current.value;
    }

    if (name === '' || email === '' || password === '' || passwordConfirm === '')
    {
      clientError.message = "Make sure to fill all the necessary data";
      setResponseError(clientError, dispatch);
      return;
    }
      
    if (!emailRegex.test(email))
    {
      clientError.message = "Make sure your email is in the correct format";
      setResponseError(clientError, dispatch);
      return;
    }

    if (password !== passwordConfirm)
    {
      clientError.message = "Make sure both password fields match";
      setResponseError(clientError, dispatch);
      return;
    }

    if (password.length < 8)
    {
      clientError.message = "Your password must be atleast 8 characters long";
      setResponseError(clientError, dispatch);
      return;
    }
    
    const newUser =
    {
      id: uuid(),
      name: name,
      email: email,
      password: password,
      registration: registration,
      program: type === 'academic' ? selectedProgram.id : null
    }

    axios.post(`/g/user/create`, newUser)
    .then(res => 
    {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setUser(newUser);
      navigate('/');
    })
    .catch(err => setResponseError(err, dispatch))
  }

  function ListProgram({ itemData: program })
  {
    const programSelected = program.id === selectedProgram?.id;

    function selectProgram()
    {
      setSelectedProgram(program); 
      setProgramsListShown(false)
    }

    return (
      <div
        className={`program ${programSelected ? 'program--selected' : ''}`}
        onClick={ selectProgram }
        children={ program.name }
      />
    )
  }

  return (
    <div className="register">
      <div 
        className="register__form"
        id='guest'
      >
        <div 
          className="register__welcome"
          children="QUERO DESCOBRIR"
        />
        
        <div className="register__inputs">
          <div className="register__input">
            <FontAwesomeIcon icon={ faUser }/>
            <input 
              type="text" 
              ref={ nameGuestRef } 
              name="name" 
              id="name-guest" 
              placeholder="Nome"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input 
              type="email" 
              ref={ emailGuestRef } 
              name="email" 
              id="email-guest" 
              placeholder="Email"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordGuestRef } 
              name="password" 
              id="password-guest" 
              placeholder="Senha" 
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordGuestConfirmRef } 
              name="password-confirm" 
              id="password-confirm-guest" 
              placeholder="Confirme sua senha" 
            />
          </div>

          <p 
            className='register__navigate' 
            onClick={ () => {navigate('/login')} }
            children="Já possui uma conta? Clique aqui!"
          />
        </div>

        <button 
          className="register__auth" 
          onClick={ () => {register('guest')} }
          children="REGISTRAR"
        />

        <a 
          href="#academic"
          className="register__indicator"
        >
          <span>Deslize para registrar como acadêmico!</span>
          <FontAwesomeIcon icon={ faCircleDown }/>
        </a>
      </div>

      <div 
        className="register__form"
        id='academic'
      >
        <div 
          className="register__welcome"
          children="SOU ACADÊMICO"
        />
        
        <div className="register__inputs">
          <div className="register__input">
            <FontAwesomeIcon icon={ faUser }/>
            <input 
              type="text" 
              ref={ nameAcademicRef } 
              name="name" 
              id="name-academic" 
              placeholder="Nome"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input 
              type="email" 
              ref={ emailAcademicRef } 
              name="email" 
              id="email-academic" 
              placeholder="Email institucional"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faAddressCard }/>
            <input 
              type="text" 
              ref={ registrationRef } 
              name="registration" 
              id="registration" 
              placeholder="Matrícula"
            />
          </div>

          <div 
            className="register__input register__input__program"
            onClick={ () => setProgramsListShown(!programsListShown) }
          >            
            <div 
              className='register__inputs__program'
              children={ selectedProgram?.name || 'Curso' }
            />

            <FontAwesomeIcon icon={ faGraduationCap }/> 
            <FontAwesomeIcon icon={ faChevronDown }/>

            {
              programsListShown && programs.length > 0 &&
              <List
                className="program__list"
                ids="program__list"
                elements={ programs }
                ListItem={ ListProgram }
              />
            }
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordAcademicRef } 
              name="password" 
              id="password-academic" 
              placeholder="Senha" 
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordAcademicConfirmRef } 
              name="password-confirm" 
              id="password-confirm-academic" 
              placeholder="Confirme sua senha" 
            />
          </div>

          <p 
            className='register__navigate' 
            onClick={ () => {navigate('/login')} }
            children="Já possui uma conta? Clique aqui!"
          />
        </div>

        <button 
          className="register__auth" 
          onClick={ () => {register('academic')} }
          children="REGISTRAR"
        />

        <img 
          src="img/coat-of-arms.png" 
          alt="coat-of-arms"
          className='register__coa' 
        />
      </div>
    </div>
  )
}