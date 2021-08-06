// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Subcomponentes:
import HeroeView from './HeroeView';


// JSX:
function MainView() {
  return (
    <Container fluid>
      <Row>      
        <Col xs={{ span: 10, offset: 1}}>
          <Row id="welcomeDiv">
            <h1 id="mainTitle">[El equipo]</h1>
            <HeroeView />                       {/* Heroe 1 */}
            <HeroeView />                       {/* Heroe 2 */}
            <HeroeView />                       {/* Heroe 3 */}
            <HeroeView />                       {/* Heroe 4 */}
            <HeroeView />                       {/* Heroe 5 */}
            <HeroeView />                       {/* Heroe 6 */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
