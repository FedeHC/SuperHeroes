// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

// Librerías:
import { useHistory } from "react-router-dom";


function HeroCard({ index,
                    hero,
                    getSearchView,
                    deleteHeroHandler,
                    getDetailsViewHandler }) {
  
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();

  return (
    <Col>
      {/* CON HEROE */}
      {hero &&
        // Cards con bordes de color según alineamiento del héroe:
        <Card style={{ width: "17rem" }}
              className={hero.biography.alignment + "Hero heroView"}>
          
          <div className="text-center">
            {/* Posición y Nombre: */}
            <Card.Subtitle className="mb-2 text-muted">
              <h5><Badge pill bg="dark">[ {index+1} ]</Badge></h5>
            </Card.Subtitle>

            <Card.Title>
              <h1 className="heroName">{hero.name}</h1>
            </Card.Title>
          </div> 
          
          {/* Imagen: */}
          <div className="heroImageDiv">
            <Card.Img variant="top"
                      src={hero.image.url}
                      className="heroImage"
                      alt="" />
          </div>            
        
          {/* Powerstats: */}
          <Card.Text>
            <p className="powerStatsTitle">Powerstats:</p>
            <p>{showHeroPowerstats(hero)}</p>
          </Card.Text>

          {/* Botones de opciones: */}
          <ButtonGroup className="d-grid gap-1">
            <Button variant="outline-primary"
                    size="md"
                    onClick={ () => getDetailsViewHandler(index, history) }>Más detalles</Button>
                  
            <Button variant="outline-danger"
                    size="md"
                    onClick={ () => deleteHeroHandler(index) }>Quitar del equipo</Button>
          </ButtonGroup>
        </Card>
      }

      {/* SIN HEROE */}
      {!hero &&
        <Card style={{ width: "17rem" }}
              className="emptyHero heroView">
          
          <div className="text-center">
            {/* Posición y Nombre: */}
            <Card.Subtitle className="mb-2 text-muted">
              <h5><Badge pill bg="secondary">[ {index+1} ]</Badge></h5>
            </Card.Subtitle>

            <Card.Title>
              <h1 className="heroName">[ Vacante ]</h1>
            </Card.Title>
          </div> 
          
          {/* Imagen: */}
          <div className="heroDetailsImage">
            <Card.Img variant="top"
                      className="emptyImage"
                      alt="" />
          </div>
          
          {/* Botón de Agregar: */}
            <ButtonGroup className="d-grid gap-1">
              <Button variant="outline-success"
                      size="md"
                      type="input"
                      onClick={ () => getSearchView(index, history)}>Agregar al equipo</Button>
            </ButtonGroup>

        </Card>
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
                      <Badge pill bg="dark">{power}<span> </span>
                        <Badge bg="secondary">{value === "null" ? "---" : value}</Badge> {/* Algunos valores pueden llegar 'null'. */}
                      </Badge>
                    </span>
               ));
}

export default HeroCard;
