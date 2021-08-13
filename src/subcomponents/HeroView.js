// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function HeroView({ index,
                    hero,
                    getHeroesSearch,
                    deleteHeroHandler,
                    getHeroDetailsHandler }) {
  return (
    <Col xs={12} sm={6} lg={4} xl={3}>
      {/* CON HEROE */}
      {hero &&
        // Div con color de fondo según el alineamiento del heroe:
        <div className={checkAlignmentHero(hero)}>

          {/* Posición y Nombre: */}
          <div className="text-center">
            <p className="heroPosition">[ {index+1} ]</p>
            <h1 className="heroName">{hero.name}</h1>
          </div>

          {/* Imagen: */}
          <img src={hero.image.url} className="heroImage" alt=""></img>

          {/* Powerstats: */}
          <p className="powerStatsTitle">Powerstats:</p>            
          <ul className="powerStats">
            {showHeroPowerstats(hero)}
          </ul>
          <br />

          {/* Botones de opciones: */}
          <div className="d-grid gap-2">
            <Button variant="outline-primary"
                    size="lg"
                    onClick={ () => getHeroDetailsHandler(index) }>Detalles</Button>
                    
            <Button variant="outline-danger"
                    size="lg"
                    onClick={ () => deleteHeroHandler(index) }>Quitar del equipo</Button>
          </div>
        </div>
      }
      
      {/* SIN HEROE */}
      {!hero &&
        <div className="heroView">
          {/* Título vacío: */}
          <div className="text-center">
            <p className="heroPosition">[ {index+1} ]</p>
            <h1 className="heroName">[ Vacante ]</h1>
          </div>

          {/* Fondo gris representando "sin imagen": */}
          <div className="emptyImage"></div>
          <br />
          
          {/* Botón de Agregar: */}
          <div className="d-grid gap-2">
            <Button variant="outline-success"
                    size="lg"
                    type="input"
                    onClick={ () => getHeroesSearch(index)}>Agregar al equipo</Button>
          </div>
        </div>
      }
    </Col>
  );
}

function checkAlignmentHero(hero) {
  switch(hero.biography.alignment) {
    case "good":
      return "heroView goodHero";
    case "bad":
      return "heroView badHero";
    case "neutral":
      return "heroView neutralHero";
    case "":
      return "heroView neutralHero";
    default:
      return "heroView";
  }
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con clave y valor (en negrita) por cada powerstat:
function showHeroPowerstats(hero) {
  return Object.entries(hero.powerstats)
               .map( ([power, value], index) => (
                  <li key={index}>
                    {power}:
                    <b>{value === "null" ? "---" : value}</b> {/* Algunos valores pueden llegar 'null'. */}
                  </li>
               ));
}

export default HeroView;
