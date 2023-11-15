import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faProjectDiagram, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import List from '@/components/utils/list/list'

export default function Home()
{
  const navigate = useNavigate();
  const cards = 
  [
    { icon: faGraduationCap , header: 'Cursos'            , url: '/programs', desc: 'Conheça os cursos relacionados a computação da UFSM'      },
    // { icon: faProjectDiagram, header: 'Núcleos Formativos', url: '/nuclei'  , desc: 'Conheça os núcleos de conhecimento que compõem os cursos' },
    { icon: faBriefcase     , header: 'Carreiras'         , url: '/jobs'    , desc: 'Conheça as principais carreiras na área de computação'    },
  ]

  function HomeCard({ itemData })
  {
    return (
      <div 
        className="card"
        onClick={ () => navigate(itemData.url) }
      >
        <FontAwesomeIcon 
          className="card__icon"
          icon={ itemData.icon }
        />
        
        <div 
          className="card__header"
          children={ itemData.header }
        />

        <div 
          className="card__desc"
          children={ itemData.desc }
        />
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home__main">
        <h1 
          className="home__main__header"
          children="Já se perguntou qual área da computação mais combina com você?"
        />

        <p className="home__main__desc">
          O <span className="text--hl">UFSMDirect</span> é o site perfeito para você encontrar qual será seu curso ideal na Federal.
          Aqui, você vai entender quais são as áreas que existem na Tecnologia da Informação 
          e o que cada uma delas é, além de quais disciplinas deve se focar mais dentro do curso.
        </p>
      </div>

      <img 
        src="/img/art__home.png" 
        alt="art"
        className="home__art" 
      />

      <div className="home__about">
        <h2 
          className="home__about__header"
          children="Sobre o UFSMDirect"
        />

        <p className="home__about__text">
          O <span className="text--hl">UFSMDirect</span> surgiu no quinto semestre de Sistemas de Informação na disciplina de Projeto de Software 2 como ideia de 
          projeto para a comunidade que interage com a Universidade. Formado por quatro integrantes: Ana Clara, Felipe, Marcos e Samuel, 
          cada um encarregado de diferentes partes: design de UI/UX, desenvolvimento frontend e backend. 
           <span style={{ marginTop: 16 }}><br/>Não sabe o que são esses termos? Aqui no <span className="text--hl">UFSMDirect</span> você descobrirá! </span>
        </p>
      </div>

      <h2 
        className="home__header"
        children="CONHEÇA A ÁREA DE COMPUTAÇÃO"
      />

      <List
        className="home__cards"
        ids="home__cards"
        elements={ cards }
        ListItem={ HomeCard }
      />
    </div>
  )
}