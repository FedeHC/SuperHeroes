// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Subcomponentes:
import SearchForm from "./SearchForm";


function HeroesSearch({ getMainViewHandler,
                        searchHeroHandler,
                        searchResults,
                        addHeroHandler }) {
  // JSX:
  return (
    <Container fluid>
      <Row>      
        <Col xs={12} md={{span: 10, offset: 1}}>
          <Row id="heroesGridView">
            <SearchForm getMainViewHandler={getMainViewHandler}
                        searchHeroHandler={searchHeroHandler} />
            <br />

            {/* Tabla (si hubo resultados de búsqueda) */}
            {searchResults && searchResults.response === "success" &&
              <Table striped hover>
                <thead>
                  <tr>
                    <th className="tableResults">#</th>
                    <th className="tableResults">Foto</th>
                    <th className="tableResults">Apodo (Nombre real)</th>
                    <th className="tableResults">Opciones</th>
                  </tr>
                </thead>

                <tbody>
                  {searchResults.results.map( (hero, index) => (
                    <tr key={index}>
                      <td className="tableResults"><b>{index+1}</b></td>
                      
                      <td><img src={hero.image.url} className="imageHero" alt="" /></td>
                      
                      <td className="tableResults">{hero.name} {hero.biography["full-name"] ? "("+hero.biography["full-name"]+")" : ""}</td>
                      
                      <td><Button variant="outline-primary"
                                  type="input"
                                  size="lg"
                                  onClick={ () => addHeroHandler(index)}
                          >Agregar al equipo</Button></td>
                    </tr>   
                  ))}
                </tbody>
              </Table>
            }

            {/* Mensaje si no hubo resultados */}
            {searchResults && searchResults.response === "error" &&
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
              <p id="searchErrorMessage">No se obtuvo resultados con ese nombre.</p>
            </Col>
            }

          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroesSearch;
