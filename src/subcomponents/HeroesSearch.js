// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Subcomponentes:
import SearchForm from "./SearchForm";


function HeroesSearch({ heroes,
                        getMainViewHandler,
                        searchHeroHandler,
                        searchResults,
                        addHeroHandler }) {
   
  // JSX:
  return (
    <Container fluid>
      <Row id="heroesGridView">      
        <Col xs={12} md={{span: 10, offset: 1}}>
          
          {/* Formulario de búsqueda (input y botones) */}
          <SearchForm getMainViewHandler={getMainViewHandler}
                      searchHeroHandler={searchHeroHandler} />
          <br />

          {/* Tabla (SI hubo resultados) */}
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
                    
                    <td className="tableResults">{hero.name} {hero.biography["full-name"] ? "(" + hero.biography["full-name"] + ")" : ""}</td>
                    
                    <td>
                      {/* En la sig. linea de código se busca si algún hero.id en nuestro equipo coincide
                          con alguno de la tabla de resultados. En caso de coincidir, no se muestra el botón
                          de agregar para evitar duplicados. Solo se muestra boton deshabilitado indicando
                          que ya forma parte del equipo. */}
                      {heroes.some( ( anyHero ) => anyHero?.id === hero.id)
                        ? 
                        <Button variant="outline-danger"
                                type="input"
                                size="lg"
                                disabled
                        >Está en el equipo</Button>
                        :
                        <Button variant="outline-primary"
                                  type="input"
                                  size="lg"
                                  onClick={ () => addHeroHandler(index) }
                          >Agregar al equipo</Button>
                      }
                    </td>
                  </tr>   
                ))}
              </tbody>
            </Table>
          }

          {/* Mensajes de error (si NO hubo resultados) */}
          {searchResults && searchResults.error &&
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
              {/* El nombre no trajo resultados */}
              {searchResults.error === "character with given name not found" &&
                <p id="searchErrorMessage">No se obtuvo resultados con ese nombre.</p>
              }
              
              {/* Error CORS */}
              {searchResults.status === "CORS" &&
                <p id="searchErrorMessage">Error al buscar resultados 
                  (Error <a href="https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin">CORS</a>).
                </p>
              }

              {/* Error númerico (404, 429, 403, etc.) */}
              {Number.isInteger(searchResults.error) &&
                <p id="searchErrorMessage">Error al buscar resultados 
                  (Error <a href={"https://developer.mozilla.org/es/docs/Web/HTTP/Status/" + searchResults.error}>{searchResults.error}</a>).
                </p>
              }
            </Col>
          }
          
        </Col>
      </Row>
    </Container>
  );
}

export default HeroesSearch;
