import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '@/utils/axiosConfig';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import List from '@/components/utils/list/list'

export default function Programs()
{
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => 
  {
    if (programs.length <= 0)
    {
      axios.get('/g/program/get-min-programs?type=prog')
      .then(res => setPrograms(res.data))
      .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => { console.log(programs) }, [programs])

  function ProgramInfo({ itemData: program })
  {
    const paragraphs = program.description.split('<br/>');

    return (
      <div className="info">
        <div className="info__content">
          <h3 
            className="info__name"
            children={ program.name }
          />

          <p 
            className="info__desc"
            children={ paragraphs[0] }
          />

          <button 
            className="info__cta"
            onClick={ () => {navigate(`/program/${program.id}`)} }
          >
            <span>SAIBA MAIS</span>
            <FontAwesomeIcon icon={ faArrowRight } />
          </button>
        </div>

        <img 
          src={`/img/program_arts/${program.art}`} 
          alt="art"
          className="info__art" 
        />
      </div>
    )
  }

  return (
    <div className="programs">
      <h1 
        className="programs__header"
        children="CURSOS DE TECNOLOGIA DA UFSM"
      />

      <div className="programs__infos">
        <div className="programs__info">
          <div className="programs__info__content">
            <h1 className="programs__info__title">
              <span className="blue">Bacharelado</span> ou <span className="purple">Tecnólogo</span>?
            </h1>

            <p className="programs__info__text">
              A diferença entre um bacharel e um tecnólogo está na duração, no escopo e na abordagem de ambos. 
              Enquanto o bacharelado oferece uma educação mais ampla e teórica, com entendimento conceitual mais profundo e normalmente 
              com uma duração de 4 ou 5 anos, o tecnólogo é mais focado e prático, preparando os alunos para carreiras específicas e necessidades do mercado de trabalho.
            </p>
          </div>
        </div>

        
        <h1 
          className="programs__subheader"
          children="BACHARELADOS"
        />

        <List 
          className="programs__list programs__list--bachelor"
          ids="programs__list--bachelor"
          elements={ programs.filter(program => program.type === 'bachelor') }
          ListItem={ ProgramInfo }
        />

        <h1 
          className="programs__subheader"
          children="TECNÓLOGOS"
        />

        <List 
          className="programs__list programs__list--bachelor"
          ids="programs__list--bachelor"
          elements={ programs.filter(program => program.type === 'technologist') }
          ListItem={ ProgramInfo }
        />
      </div>
    </div>
  )
}