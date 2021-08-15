// React-Bootstrap:
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

// Otros:
import logo from "../assets/images/superhero-64.png";


function HeroDetails({ hero, getMainViewHandler }) {
  return (
    <Container fluid>
      <Row>
        {/* Col con color de fondo según el alineamiento del heroe: */}
        <Col xs={{span: 10, offset: 1}} className={checkAlignmentHero(hero) + " heroDetails"}>
          <Row>
            <Col xs={12}>
              {/* Logo y Título */}
              <div className="text-center">
                <Image src={logo}
                      id="imageLogo"
                      alt="Logo" />

                <h1 id="heroDetailsTitle">[Detalles del Héroe]</h1>
                <br /><br />
              </div>

              {/* Nombre */}
              <h1>Nombre: <span className="heroName">{hero.name}</span></h1>
            </Col>

            <Col xs={12} md={6}>            
              {/* Imagen */}
              <img src={hero.image.url} className="heroDetailsImage" alt=""></img>
              <br></br>
              {/* Powerstats */}
              <p className="heroDescription">Powerstats de {hero.name}:</p>            
              <h5>{showHeroPowerstats(hero)}</h5>
            </Col>

            {/* Detalles del Héroe/Villano */}
            <Col xs={12} md={6}>
              <h1 className="heroDescription">Detalles de {hero.name}:</h1>
              <ul className="powerStats">
                <li>
                  <h5><Badge bg="dark">Alias</Badge></h5>
                  <ul>{showHeroAliases(hero)}</ul>
                </li>
                <br />                
                <li>
                  <h5>
                    <Badge bg="dark">Altura<span> </span>
                    <Badge bg="secondary">{hero.appearance.height[1]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge bg="dark">Peso<span> </span>
                    <Badge bg="secondary">{hero.appearance.weight[1]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge bg="dark">Color de ojos<span> </span>
                    <Badge bg="secondary">{hero.appearance["eye-color"]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <li>
                  <h5>
                    <Badge bg="dark">Color de cabello<span> </span>
                    <Badge bg="secondary">{hero.appearance["hair-color"]}</Badge>
                    </Badge>
                    <span> </span>
                  </h5>
                </li>
                <br />

                <li>
                  <h5><Badge bg="dark">Lugares de trabajo</Badge></h5>
                  <ul>{showWorkBases(hero)}</ul>
                </li>
              </ul>
            </Col>

            {/* Boton Volver */}
            <Col xs={12} className="text-center">
              <br /><br />
              <Button variant="outline-dark"
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

// Función auxiliar que toma un héroe como parámetro y retorna un string para usar de
// estilo en Col:
function checkAlignmentHero(hero) {
  switch(hero.biography.alignment) {
    case "good":
      return "goodHero";
    case "bad":
      return "badHero";
    case "neutral":
      return "neutralHero";
    case "":
      return "neutralHero";
    default:
      return "";
  }
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con clave y valor (en negrita) por cada powerstat:
function showHeroPowerstats(hero) {
  return Object.entries(hero.powerstats)
               .map( ([power, value], index) => (
                  <li key={index}>
                    {power}:
                    <b>{value === "null" ? "---" : value}</b> {/* Algunos valores pueden llegar 'null'. */}
                  </li>
               ));
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con los todos alias listados (si existen):
function showHeroAliases(hero) {
  return hero.biography.aliases.map( (alias, index) =>
    <li key={index}>
      <i>
        {/* Algunos alias pueden llegar con varios adentro, separados por coma o punto y coma.*/}
        {alias.split(/,|;/).map( (base, index) => 
          <span key={index}>{base}<br /></span>)}
      </i>
    </li>);
}

// Función auxiliar que toma un héroe como parámetro y retorna un conjunto de varios <li>,
// con los todos lugares de trabajo del héroe listados (si existen):
function showWorkBases(hero) {
  return hero.work.base.split(/,|;/)
                       .map( (base, index) =>
                         <li key={index}>
                           <i>{base}</i>
                         </li>);
}

export default HeroDetails;
