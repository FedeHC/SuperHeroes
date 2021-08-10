// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function HeroDetails({ hero, getMainViewHandler }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={{span: 10, offset: 1}}
             className={hero.biography.alignment === "good" ? "heroDetails goodHero" : "heroDetails badHero"}>
          
          <Row>
            <Col xs={12}>
              {/* Título */}
              <h1 id="heroDetailsTitle">[Detalles del Heroe]</h1>
              <br />
              {/* Nombre */}
              <h1>Nombre: <span className="heroName">{hero.name}</span></h1>
            </Col>

            <Col xs={12} md={6}>            
              {/* Imagen */}
              <img src={hero.image.url} className="heroDetailsImage" alt=""></img>

              {/* Powerstats */}
              <p className="powerStatsTitle">Powerstats de {hero.name}:</p>            
              <ul className="powerStats">
                {Object.entries(hero.powerstats)
                        .map( ([power, value], index) => <li key={index}>{power}: <b>{value}</b></li> )
                        .sort()}
              </ul>
            </Col>

            {/* Detalles del Héroe/Villano */}
            <Col xs={12} md={6}>
              <h1 className="heroDescription">Detalles:</h1>
              <ul className="powerStats">
                <li>
                  {hero.biography.aliases.length <= 1 ? "Alias:" : "Aliases:"}
                  <ul>
                    {hero.biography.aliases.map( (alias) => <li><i>{alias}</i></li>)}
                  </ul>
                </li>
                <br />
                
                <li>Altura: <b>{hero.appearance.height[1]}.</b></li>
                <li>Peso: <b>{hero.appearance.weight[1]}.</b></li>
                <li>Color de ojos: <b>{hero.appearance["eye-color"]}</b></li>
                <li>Color de cabello: <b>{hero.appearance["hair-color"]}</b></li>
                <br />

                <li>Lugares de trabajo: <ul>{hero.work.base.split(";").map( (base) => <li><i>{base}</i></li>)}</ul></li>
              </ul>
            </Col>

            {/* Boton Volver */}
            <Col xs={12} className="text-center">
              <br />
              <Button variant="outline-secondary"
                          type="input"
                          size="lg"
                          onClick={ () => getMainViewHandler()}
              >Volver a principal</Button>
            </Col>            
          </Row>
          
        </Col>
      </Row>
    </Container>
  );
}

export default HeroDetails;
