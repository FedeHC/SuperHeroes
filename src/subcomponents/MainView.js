// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Subcomponentes:
import HeroeView from './HeroView';


// JSX:
function MainView({ heroes,
                    getHeroesSearch,
                    deleteHeroHandler,
                    getHeroDetailsHandler }) {
  return (
    <Container fluid>
      <Row>      
        <Col xs={12}>
          <Row id="mainView">
            <h1 id="mainTitle">[El equipo de SuperHéroes]</h1>
            
            {/* Powerstats grupales del equipo */}
            <Col xs={12}>
              <div id="teamDiv">
                <p>Powerstats grupales</p>
              </div>
            </Col>

            {/* 6 vistas de heroes o vacantes */}
            {heroes.map( (hero, index) => (
              <HeroeView key={index}
                         index={index}
                         hero={hero}
                         getHeroesSearch={getHeroesSearch}
                         deleteHeroHandler={deleteHeroHandler}
                         getHeroDetailsHandler={getHeroDetailsHandler} />) )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
