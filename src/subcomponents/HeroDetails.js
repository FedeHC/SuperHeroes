// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function HeroDetails({ hero, getMainViewHandler }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
          <div id="heroDetails"
               className={hero.biography.alignment === "good" ? "goodHero" : "badHero"}>
            <h1>[Detalles del Heroe]</h1>
            <br></br>
            <Button variant="outline-secondary"
                        type="input"
                        size="lg"
                        onClick={ () => getMainViewHandler()}
            >Volver a principal</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroDetails;
