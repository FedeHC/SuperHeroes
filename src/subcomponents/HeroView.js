// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";

// Librerías:
import { useHistory } from "react-router-dom";


function HeroView({ index,
                    hero,
                    getHeroesSearch,
                    deleteHeroHandler,
                    getHeroDetailsHandler }) {
  
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();

  return (
    <Col xs={12} md={6} lg={4}>
      {/* CON HEROE */}
      {hero &&
        // Div con color de fondo según el alineamiento del heroe:
        <div className={hero.biography.alignment + "Hero heroView"}>

          {/* Posición y Nombre: */}
          <div className="text-center">
            <h5><Badge bg="dark">[ {index+1} ]</Badge></h5>
            <h1 className="heroName">{hero.name}</h1>
          </div>

          {/* Imagen: */}
          <div className="heroImageDiv">
            <img src={hero.image.url} className="heroImage" alt=""></img>
          </div>

          {/* Powerstats: */}
          <p className="powerStatsTitle">Powerstats:</p>
          <h5>{showHeroPowerstats(hero)}</h5>
          <br />

          {/* Botones de opciones: */}
          <div className="d-grid gap-2">
            <Button variant="outline-primary"
                    size="lg"
                    onClick={ () => getHeroDetailsHandler(index, history) }>Detalles</Button>
                    
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
                    onClick={ () => getHeroesSearch(index, history)}>Agregar al equipo</Button>
          </div>
        </div>
      }
    </Col>
  );
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios 'Badge',
// con nombre y valor de cada powerstat:
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
