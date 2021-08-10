// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function HeroView({ index,
                    hero,
                    getHeroesSearch,
                    deleteHeroHandler,
                    getHeroDetailsHandler }) {
  return (
    <Col xs={12} sm={6} lg={4} xl={3}>
      {/* CON HEROE */}
      {hero &&
        <div className={hero.biography.alignment === "good" ? "heroView goodHero" : "heroView badHero"}>
          {/* Nombre */}
          <h1 className="heroName">{hero.name}</h1>

          {/* Imagen */}
          <img src={hero.image.url} className="heroImage" alt=""></img>

          {/* Powerstats: */}
          <p className="powerStatsTitle">Powerstats:</p>            
          <ul className="powerStats">
            {Object.entries(hero.powerstats)
                    .map( ([power, value], index) => <li key={index}>{power}: {value}</li> )
                    .sort()}
          </ul>

          {/* Botones de opciones */}
          <div className="d-grid gap-2">
            <Button variant="outline-primary"
                    size="lg"
                    onClick={ () => getHeroDetailsHandler(index) }>Detalles</Button>
                    
            <Button variant="outline-danger"
                    size="lg"
                    onClick={ () => deleteHeroHandler(index) }>Quitar del equipo</Button>
          </div>
        </div>
      }
      
      {/* SIN HEROE*/}
      {!hero &&
        <div className="heroView">
          {/* Título vacío */}
          <h1>[Vacío]</h1>

          {/* Fondo gris (sin imagen)  */}
          <div className="emptyImage"></div>
          <br />
          
          {/* Botón de Agregar */}
          <div className="d-grid gap-2">
            <Button variant="outline-success"
                    size="lg"
                    type="input"
                    onClick={ () => getHeroesSearch(index)}>Agregar Héroe o Villano</Button>
          </div>
        </div>
      }
    </Col>
  );
}

export default HeroView;
