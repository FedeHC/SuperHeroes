// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

// Subcomponentes:
import SearchHero from "./SearchHero";


function HeroesGrid({ getMainViewHandler, searchHeroHandler, searchResults }) {
  // JSX:
  return (
    <Container fluid>
      <Row>      
        <Col xs={12} md={{span: 10, offset: 1}}>
          <Row id="heroesGridView">
            <SearchHero getMainViewHandler={getMainViewHandler}
                        searchHeroHandler={searchHeroHandler} />
            <br />
            
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Foto</th>
                  <th>Apodo (Nombre real)</th>
                  <th>Opciones</th>
                </tr>
              </thead>

              <tbody>
                {searchResults.map( (hero, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{hero.image.url}</td>
                    <td>{hero.name} {hero.biography["full-name"] ? "("+hero.biography["full-name"]+")" : ""}</td>
                    <td>Agregar al equipo</td>
                  </tr>   
                ))}
              </tbody>
            </Table>

          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroesGrid;
