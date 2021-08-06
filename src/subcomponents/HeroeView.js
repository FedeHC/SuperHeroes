// React-Bootstrap:
import Col from 'react-bootstrap/Col';


function HeroeView() {
  return (
    <Col md={{ span: 12}} lg={{ span: 6}} xl={{ span: 4}}>
      <div class="heroeView">
        <h1>Heroe</h1>
        <img src="#"></img>
        <p>Powerstats:</p>
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <p>Detalles</p>
        <p>Borrar del equipo</p>
      </div>
    </Col>
  );
}

export default HeroeView;
