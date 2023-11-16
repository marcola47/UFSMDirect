import { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/app';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faHome, faGraduationCap, faNewspaper, faProjectDiagram, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';

function NavbarLink({ page, icon, text })
{
  const navigate = useNavigate();

  return (
    <div 
      className="navbar__link"
      onClick={ () => navigate(page) }
    >
      <FontAwesomeIcon icon={ icon }/>
      <div 
        className="navbar__link__text"
        children={ text }
      />
    </div>
  )
}

export default function Navbar()
{
  const { user } = useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [navbarShown, setNavbarShown] = useState(false);

  const style = navbarShown
  ? { transform: 'translateX(0%)' }
  : { transform: 'translateX(100%)' }

  useEffect(() => 
  {
    function handleResize() 
    { setScreenWidth(window.innerWidth) };
    
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize) };
  }, []);

  if (screenWidth <= 1200)
  {
    return (
      <div className="navbar">
        <a href="/">
          <img 
            src="/img/logo--name--lm.png" 
            alt="logo-name"
            className="navbar__logo"
          />
        </a>

        <div 
          className="navbar__burger"
          onClick={ () => {setNavbarShown(!navbarShown)} }
          children={ <FontAwesomeIcon icon={ faBarsStaggered }/> }
        />

        <div 
          className="navbar__links"
          style={ style }
        >
          {/* <NavbarLink 
            page="/nuclei" 
            icon={ faProjectDiagram } 
            text="Núcleos Formativos"
          /> */}

          {/* <NavbarLink 
            page="/courses" 
            icon={ faNewspaper } 
            text="Disciplinas"
          /> */}

          <NavbarLink 
            page="/programs" 
            icon={ faGraduationCap } 
            text="Cursos"
          />

          <NavbarLink 
            page="/jobs" 
            icon={ faBriefcase } 
            text="Carreiras"
          />

          <NavbarLink 
            page="/" 
            icon={ faHome } 
            text="Início"
          />
          
          { 
            user
            ? <NavbarLink 
                page="/profile" 
                icon={ faUser } 
                text="Perfil"
              />

            : <NavbarLink
                page="/login"
                icon={ faUser }
                text="Login"
              />
          }
        </div>
      </div>
    )
  }

  return (
    <div className="navbar">
      <div className="navbar__content">
        <a href="/">
          <img 
            src="/img/logo--name--lm.png" 
            alt="logo-name"
            className="navbar__logo"
          />
        </a>

        <div className="navbar__links">
          {/* <NavbarLink 
            page="/nuclei" 
            icon={ faProjectDiagram } 
            text="Núcleos Formativos"
          />

          <NavbarLink 
            page="/courses" 
            icon={ faNewspaper } 
            text="Disciplinas"
          /> */}

          <NavbarLink 
            page="/programs" 
            icon={ faGraduationCap } 
            text="Cursos"
          />

          <NavbarLink 
            page="/jobs" 
            icon={ faBriefcase } 
            text="Carreiras"
          />

          <NavbarLink 
            page="/" 
            icon={ faHome } 
            text="Início"
          />
          
          { 
            user
            ? <NavbarLink 
                page="/profile" 
                icon={ faUser } 
                text="Perfil"
              />

            : <NavbarLink
                page="/login"
                icon={ faUser }
                text="Login"
              />
          }
        </div>
      </div>
    </div>
  )
}