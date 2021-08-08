// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Subcomponentes:
import HeroeView from './HeroView';


// JSX:
function MainView({heroes, setHeroes}) {
  return (
    <Container fluid>
      <Row>      
        <Col xs={12}>
          <Row id="mainView">
            <h1 id="mainTitle">[El equipo]</h1>
            {heroes.map( (hero, index) => <HeroeView id={index} hero={hero} />) }
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
