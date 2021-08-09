// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function HeroView({ index,
                    hero,
                    getHeroesSearch,
                    deleteHeroHandler }) {
  return (
    <Col sm={12} md={6} xl={4}>
      {/* CON HEROE */}
      {hero &&
        <div className={hero.biography.alignment === "good" ? "heroView goodHero" : "heroView badHero"}>
          <h1 className="heroName">{hero.name}</h1>
          
          <img src={hero.image.url} className="heroImage" alt=""></img>

          <p className="powerStatsTitle">Powerstats:</p>            
          <ul className="powerStats">
            {Object.entries(hero.powerstats)
                    .map( ([power, value], index) => <li key={index}>{power}: {value}</li> )
                    .sort()}
          </ul>

          <div className="d-grid gap-2">
            <Button variant="outline-primary"
                    size="lg"
                    onClick="">Detalles</Button>
                    
            <Button variant="outline-danger"
                    size="lg"
                    onClick={ () => deleteHeroHandler(index) }>Quitar del equipo</Button>
          </div>
        </div>
      }
      
      {/* SIN HEROE*/}
      {!hero &&
        <div className="heroView">
          <h1>[Vacío]</h1>
          <div className="emptyImage"></div>
          <br />
          <div className="d-grid gap-2">
            <Button variant="outline-success"
                    size="lg"
                    type="input"
                    onClick={ () => getHeroesSearch()}>Agregar Héroe o Villano</Button>
          </div>
        </div>
      }
    </Col>
  );
}

export default HeroView;
