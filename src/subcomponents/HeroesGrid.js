// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

// Subcomponentes:
import SearchHero from "./SearchHero";


function HeroesGrid({ getMainViewHandler }) {
  // JSX:
  return (
    <Container fluid>
      <Row>      
        <Col xs={12} md={{span: 10, offset: 1}}>
          <Row id="heroesGridView">
            <SearchHero getMainViewHandler={getMainViewHandler} />

            {/*
            <Table striped noborder hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Opciones</th>
                </tr>
              </thead>
            </Table>
            */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroesGrid;
