// React-Bootstrap:
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AccumulativeStats({ heroes }) {
  return (
    <Col xs={12}>
      <Row className="accumulativeDiv">
        <Col xs={12} md={6}>
          <p className="accumulativePowerStats">Powerstats acumulados de todos los miembros:</p>
          <ul className="accumulativePowerStats">
            {showAccumulativePowerstats(heroes)}
          </ul>
        </Col>

        <Col xs={12} md={6}>
          <p className="accumulativePowerStats">Pesos y alturas promedio del equipo:</p>
          <ul className="accumulativePowerStats">
            {showWeightHeightAverage(heroes)}
          </ul>
        </Col>
      </Row>
    </Col>
  );
}

// Función que recibe héroes por parámetro y devuelve JSX con todos los powerstats acumulados
// de cada miembro del equipo:
function showAccumulativePowerstats(heroes) {
  // Creando objeto inicial de powerstats acumulativos:
  const factionPowerstats = {
    "intelligence": 0,
    "speed": 0,
    "durability":	0,
    "power": 0,
    "combat": 0,
    "strength": 0
  };

  // Sumando cada powerstats en héroes de la misma facción recibida por argumento:
  heroes.forEach( (hero) => {
    if (hero) {
       // Primero acumulando powerstats:
      Object.entries(hero.powerstats)
            .map( ([trait, value]) =>
              factionPowerstats[trait] += parseInt(value))
    }
  });
  
  // JSX:
  return (
    <>
    {Object.entries(factionPowerstats)
           .sort( ([,a],[,b]) => b - a )      // Pasando función de ordenamiento a sort.
           .map( ([trait, value], index) =>   // Mapeando a elementos <li>, con rasgos y valores.
              <li key={index}>
                {index === 0 &&
                  <span className="firstPowerstat">{trait}: {value}</span>
                }
                {index > 0 &&
                  <span>{trait}: {value}</span>
                }
              </li>)
    }
    </>
  );
}

// Función que recibe héroes por parámetro y devuelve JSX con todos los pesos y alturas
// acumulados de cada miembro del equipo:
function showWeightHeightAverage(heroes) {
  const heightsTotal = [];
  const weightsTotal = [];

  // Acumulando alturas y pesos:
  heroes.forEach( (hero) => {
    if (hero) {
      let height = hero.appearance.height[1];
      let weight = hero.appearance.weight[1];

      heightsTotal.push(parseInt(height));  // No es necesario sacar 'kg' (parseInt solo toma números).
      weightsTotal.push(parseInt(weight));  // No es necesario sacar 'cm' (parseInt solo toma números).
    }
  });
  
  // Sacando totales de c/u:
  const heightsAverage = heightsTotal.reduce( (total, current) => total + current, 0) / heightsTotal.length;
  const weightsAverage = weightsTotal.reduce( (total, current) => total + current, 0) / weightsTotal.length;

  // JSX:
  return (
    <>
      <li>Altura promedio: <b>{heightsAverage ? heightsAverage.toFixed(2) : 0 } cm.</b></li>
      <li>Peso promedio: <b>{weightsAverage ? weightsAverage.toFixed(2) : 0} kg.</b></li>
    </>
  );
}

export default AccumulativeStats;