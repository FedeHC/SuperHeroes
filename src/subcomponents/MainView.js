// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Subcomponentes:
import HeroeView from './HeroView';


// JSX:
function MainView({heroes, setHeroes, getHeroGridHandler}) {
  return (
    <Container fluid>
      <Row>      
        <Col xs={12}>
          <Row id="mainView">
            <h1 id="mainTitle">[El equipo]</h1>
            {heroes.map( (hero, index) => (
              <HeroeView key={index}
                         hero={hero}
                         getHeroGridHandler={getHeroGridHandler}/>) )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
