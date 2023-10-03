export default function Home()
{
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
        src="/img/home__art.png" 
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
    </div>
  )
}