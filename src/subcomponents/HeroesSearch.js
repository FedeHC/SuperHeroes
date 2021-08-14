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

          {/* Mensajes de error */}
          {searchResults && searchResults.response === "error" &&
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>

              {response = checkErrorAndGiveAResponse(searchResults.error),
                <p id="searchErrorMessage">{response.message}
                  {response.link &&
                    <a href={response.link}
                       target="_blank"
                       rel="noreferrer">{` (error ${searchResults.error})`}
                    </a>
                  }
                  <span>.</span>
                </p>
              }
            </Col>
          }
          
        </Col>
      </Row>
    </Container>
  );
}
// Función auxiliar que toma 2 parámetros: el equipo de héroes agregados y un héroe buscado.
// Se devuelve un booleano indicando el id del héroe ya está presente en el equipo.
function isHeroAlreadyInTeam(heroes, hero) {
  return heroes.some( ( anyHero ) => anyHero?.id === hero.id);
}

// Función auxiliar que toma 3 parámetros: el equipo de héroes, un héroe nuevo a agregar y
// la cantidad máxima de héroes permitidos por cada facción (buenos, malos, neutrales).
// Se retorna booleano indicando si ha excedido el máx. por facción ya presentes en el equipo.
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

// Función auxiliar que toma un héroe por parámetro y retorna string (en español) indicando
// la facción obtenida del mismo.
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

// Función auxiliar que recibe un string de error como parámetro y devuelve un objeto
// conteniendo strings de mensaje y link de información.
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
