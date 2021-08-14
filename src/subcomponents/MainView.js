// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from "react-bootstrap/Image";

// Subcomponentes:
import AccumulativeStats from './AccumulativeStats';
import HeroeView from './HeroView';

// Otros:
import logo from "../assets/images/superhero-64.png";


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
            {/* Logo y Título */}
            <div className="text-center">
              <Image src={logo}
                     id="imageLogo"
                     alt="Logo" />

              <h1 id="mainTitle">[Armá tu equipo de SuperHéroes]</h1>
              <br /><br />
            </div>
            
            {/* Powerstats grupales del equipo */}
            <AccumulativeStats heroes={heroes} />

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
