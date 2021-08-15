// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";


function HeroView({ index,
                    hero,
                    getHeroesSearch,
                    deleteHeroHandler,
                    getHeroDetailsHandler }) {
  return (
    <Col xs={12} md={6} lg={4}>
      {/* CON HEROE */}
      {hero &&
        // Div con color de fondo según el alineamiento del heroe:
        <div className={checkAlignmentHero(hero) + " heroView"}>

          {/* Posición y Nombre: */}
          <div className="text-center">
            <h5><Badge bg="dark">[ {index+1} ]</Badge></h5>
            <h1 className="heroName">{hero.name}</h1>
          </div>

          {/* Imagen: */}
          <img src={hero.image.url} className="heroImage" alt=""></img>

          {/* Powerstats: */}
          <p className="powerStatsTitle">Powerstats:</p>
          <h4>{showHeroPowerstats(hero)}</h4>
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
            <h5><Badge bg="dark">[ {index+1} ]</Badge></h5>
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

// Función auxiliar que toma un héroe como parámetro y retorna un string para usar de
// estilo en div:
function checkAlignmentHero(hero) {
  switch(hero.biography.alignment) {
    case "good":
      return "goodHero";
    case "bad":
      return "badHero";
    case "neutral":
      return "neutralHero";
    case "":
      return "neutralHero";
    default:
      return "";
  }
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con clave y valor (en negrita) por cada powerstat:
function showHeroPowerstats(hero) {
  return Object.entries(hero.powerstats)
               .map( ([power, value], index) => (
                    <span key={index}>
                      <Badge bg="dark">{power}<span> </span>
                        <Badge bg="secondary">{value === "null" ? "---" : value}</Badge> {/* Algunos valores pueden llegar 'null'. */}
                      </Badge>
                      <br />
                    </span>
               ));
}

export default HeroView;
