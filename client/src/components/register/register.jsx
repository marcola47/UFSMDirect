import { useContext, useRef } from 'react';
import { UserContext, ReducerContext } from '@/app';
import { useNavigate } from 'react-router-dom';
import axios, { setResponseError } from '@/utils/axiosConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faAddressCard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function Register()
{
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const { dispatch } = useContext(ReducerContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const registrationRef = useRef(null);
  const programRef = useRef(null);

  function register()
  {

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
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input 
              type="email" 
              ref={ emailRef } 
              name="email" 
              id="email-guest" 
              placeholder="Email"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordRef } 
              name="password" 
              id="password-guest" 
              placeholder="Senha" 
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordConfirmRef } 
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
          onClick={ register }
          children="REGISTRAR"
        />
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
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input 
              type="email" 
              ref={ emailRef } 
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

          <div className="register__input">
          <FontAwesomeIcon icon={ faGraduationCap }/>
            <input 
              type="text" 
              ref={ programRef } 
              name="program" 
              id="program" 
              placeholder="Curso"
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordRef } 
              name="password" 
              id="password-academic" 
              placeholder="Senha" 
            />
          </div>

          <div className="register__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input 
              type="password" 
              ref={ passwordConfirmRef } 
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
          onClick={ register }
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