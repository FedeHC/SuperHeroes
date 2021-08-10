// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function HeroDetails({ hero, getMainViewHandler }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={{span: 10, offset: 1}}
             className={hero.biography.alignment === "good" ? "heroDetails goodHero" : "heroDetails badHero"}>
          
          <Row>
            <Col xs={12}>
              {/* Título */}
              <h1 id="heroDetailsTitle">[Detalles del Heroe]</h1>
              <br />
              {/* Nombre */}
              <h1>Nombre: <span className="heroName">{hero.name}</span></h1>
            </Col>

            <Col xs={12} md={6}>            
              {/* Imagen */}
              <img src={hero.image.url} className="heroDetailsImage" alt=""></img>

              {/* Powerstats */}
              <p className="powerStatsTitle">Powerstats de {hero.name}:</p>            
              <ul className="powerStats">
                {Object.entries(hero.powerstats)
                        .map( ([power, value], index) => <li key={index}>{power}: {value}</li> )
                        .sort()}
              </ul>
            </Col>

            {/* Detalles del Héroe/Villano */}
            <Col xs={6}>
              <h1 className="heroDescription">Detalles:</h1>
            </Col>

            {/* Boton Volver */}
            <Col xs={12} className="text-center">
              <br /><br />
              <Button variant="outline-secondary"
                          type="input"
                          size="lg"
                          onClick={ () => getMainViewHandler()}
              >Volver a principal</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroDetails;
