// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function HeroView({ hero, getHeroGridHandler }) {
  return (
    <Col md={12} lg={6} xl={4}>
      <div className="heroView">

        {/* CON HEROE */}
        {hero !== 0 &&
          <>
            <h1 className="heroName">Héroe</h1>
            <img src="#" className="heroImage" alt=""></img>
            <p>Powerstats:</p>
            <ol>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ol>
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
        {hero === 0 &&
          <>
            <h1>[Vacío]</h1>
            <div className="emptyImage"></div>
            <br />
            <div className="d-grid gap-2">
              <Button variant="outline-success"
                      size="lg"
                      type="input"
                      onClick={getHeroGridHandler}>Agregar Héroe o Villano</Button>
            </div>
          </>
        }
      </div>
    </Col>
  );
}

export default HeroView;
