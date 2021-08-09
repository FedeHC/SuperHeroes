// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function HeroView({ hero, getHeroesSearch }) {
  return (
    <Col sm={12} md={6} xl={4}>
      <div className="heroView">

        {/* CON HEROE */}
        {hero &&
          <>
            <h1 className="heroName">{hero.name}</h1>
            
            <img src={hero.image.url} className="heroImage" alt=""></img>

            <p className="powerStatsTitle">Powerstats:</p>            
            <ul className="powerStats">
              {Object.entries(hero.powerstats)
                     .map( ([power, value]) => <li>{power}: {value}</li> )
                     .sort()}
            </ul>

            <div className="d-grid gap-2">
              <Button variant="outline-primary"
                      size="lg"
                      onClick="">Detalles</Button>
                      
              <Button variant="outline-danger"
                      size="lg"
                      onClick="">Quitar Héroe</Button>
            </div>
          </>
        }
        
        {/* SIN HEROE*/}
        {!hero &&
          <>
            <h1>[Vacío]</h1>
            <div className="emptyImage"></div>
            <br />
            <div className="d-grid gap-2">
              <Button variant="outline-success"
                      size="lg"
                      type="input"
                      onClick={getHeroesSearch}>Agregar Héroe o Villano</Button>
            </div>
          </>
        }
      </div>
    </Col>
  );
}

export default HeroView;
