// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

// JSX:
function HeroesGrid({ position }) {
  return (
    <Container fluid>
      <Row>      
        <Col xs={12}>
          <Row id="heroesGridView">
            <h1 id="heroesGridTitle">[Agregar SuperHeroe]</h1>
            <Table>

            </Table>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroesGrid;
