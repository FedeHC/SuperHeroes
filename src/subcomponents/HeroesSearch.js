// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Subcomponentes:
import SearchForm from "./SearchForm";


function HeroesSearch({ heroes,
                        MAX_PER_FACTION,
                        getMainViewHandler,
                        searchHeroHandler,
                        searchResults,
                        addHeroHandler }) {
   
  let response; // Variable a usar para obtener objeto de respuesta desde función auxiliar.

  // JSX:
  return (
    <Container fluid>
      <Row id="heroesGridView">      
        <Col xs={12} md={{span: 10, offset: 1}}>
          <h1 id="searchFormTitle">[Agregar un Héroe]</h1>
          <br />
          
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
                    
                    <td><img src={hero.image.url} className="heroSearchImage" alt="" /></td>
                    
                    <td className="tableResults">{hero.name} {hero.biography["full-name"] ? "(" + hero.biography["full-name"] + ")" : ""}</td>
                    
                    <td>
                      {/* A cont. se comprueba si algún heroe de nuestro equipo coincide con alguno de
                          la tabla de resultados. En caso de coincidir, el botón de agregar se muestra
                          deshabilitado indicando que ya forma parte del equipo, para evitar duplicados. */}
                      {isHeroAlreadyInTeam(heroes, hero) ?
                        <Button variant="outline-danger"
                                type="input"
                                size="lg"
                                disabled
                        >Está en el equipo</Button> :

                        /* Acá se comprueba si el héroe agregar excede la cantidad máxima (3) del bando de 
                        // héroes o villanos. Si es así, aparecerá también el botón deshabilitado, indicando
                        // que no pueden agregarse más de ese tipo (héroe o villano). */
                        isFullOnGoodOrBadGuys(heroes, hero, MAX_PER_FACTION) ?
                        <Button variant="outline-danger"
                                type="input"
                                size="lg"
                                disabled
                        >Ya hay {MAX_PER_FACTION} {factionType(hero)}</Button> :
                        
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
                  (Error <a href="https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin"
                            target="_blank"
                            rel="noreferrer">CORS</a>).
                </p>
              }

              {/* Error númerico (404, 429, 403, etc.) */}
              {Number.isInteger(searchResults.error) &&
                searchResults.error === 429 ?
                <p id="searchErrorMessage">Se ha excedido de la cantidad máx. de búsquedas permitidas por minuto
                  (Error <a href={"https://developer.mozilla.org/es/docs/Web/HTTP/Status/" + searchResults.error}
                            target="_blank"
                            rel="noreferrer">{searchResults.error}</a>).
                  <br /><br />
                  Por favor intente más tarde.
                </p>
                :
                <p id="searchErrorMessage">Error al buscar resultados 
                  (Error <a href={"https://developer.mozilla.org/es/docs/Web/HTTP/Status/" + searchResults.error}
                            target="_blank"
                            rel="noreferrer">{searchResults.error}</a>).
                </p>
              }
            </Col>
          }
          
        </Col>
      </Row>
    </Container>
  );
}

function isHeroAlreadyInTeam(heroes, hero) {
  return heroes.some( ( anyHero ) => anyHero?.id === hero.id);
}

function isFullOnGoodOrBadGuys(heroes, newHero, MAX_PER_FACTION ) {
  // Primero contamos la cantidad del mismo tipo ya presentes en nuestro equipo:
  let counter = 0;
  heroes.forEach( (heroInTeam) => {
    if (heroInTeam && heroInTeam.biography.alignment === newHero.biography.alignment) {
      counter++;
    }
  });
  // Y después comprobamos si excede o no la cantidad máxima permitida:
  if (counter === MAX_PER_FACTION)
    return true;
  return false;
}

function factionType(hero) {
  switch(hero.biography.alignment) {
    case "good":
      return "héroes";
    case "bad":
      return "villanos";
    case "neutral":
      return "neutrales";
    case "":
      return "neutrales";
    default:
      return "neutrales";
  }
}

function checkErrorAndGiveAResponse(error) {
  switch(error) {
    case "character with given name not found":
      return {
        "message": "No se obtuvo ningún resultado con ese término",
        "link": null
      };
    case "CORS":
      return {
        "message": "Error CORS",
        "link": "https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin"
      };
    case 429:
      return {
        "message": "Se ha excedido del máx. de búsquedas permitidas por minuto, intente más tarde",
        "link": "https://developer.mozilla.org/es/docs/Web/HTTP/Status/429"
      };
    default:
      return {
        "message": "Error al buscar resultados",
        "link": `https://developer.mozilla.org/es/docs/Web/HTTP/Status/${error}`
      };
  }
}

export default HeroesSearch;
