import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function MainView() {
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        
        {/* Columna con contenido */}
        <Col xs={8} md={6} lg={4}>
          <div id="welcomeDiv">
            <h1>Bienvenido!</h1>              
          </div>
        </Col>
        
        <Col></Col>
      </Row>
    </Container>
  );
}

export default MainView;
