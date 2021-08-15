// React-Bootstrap:
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge";


function AccumulativeStats({ heroes }) {
  return (
    <Col xs={12}>
      <Row className="accumulativeDiv">
        <Col xs={12}>
          <span className="accumulativePowerStats">Powerstats del equipo:</span>
          <p className="accumulativePowerStats">
            {showAccumulativePowerstats(heroes)}
          </p>

          <span className="accumulativePowerStats">Promedios:</span>
          <p className="accumulativePowerStats">
            {showWeightHeightAverage(heroes)}
          </p>
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
              // 'parseInt' toma a cont. los primeros números y descarta cualquier string
              // restante. Pero es necesario parsear a cero (0) si se recibe 'null'.
              factionPowerstats[trait] += (value === "null" ? 0 : parseInt(value)))
    }
  });
  
  // JSX:
  return (
    <>
    {Object.entries(factionPowerstats)
           .sort( ([,a],[,b]) => b - a )      // Pasando función de ordenamiento a sort.
           .map( ([trait, value], index) =>   // Mapeando a elementos <li>, con rasgos y valores.
              <li key={index}>
                {index === 0 && <span className="firstPowerstat">{trait}: {value}</span>}
                {index > 0 && <span>{trait}: {value}</span>}
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

      // Agregando valores obtenidos por API a sus respectivos arrays.
      // No hace falta quitar 'kg' o 'cm' de los strings recibidos porque 'parseInt'
      // toma solamente los primeros números (y descarta cualquier string restante).
      // Pero si es necesario parsear a cero (0) si algún string recibido es 'null'.
      heightsTotal.push(height === "null" ? 0 : parseInt(height)); 
      weightsTotal.push(weight === "null" ? 0 : parseInt(weight));
    }
  });
  
  // Sacando totales de c/u:
  const heightsAverage = heightsTotal.reduce( (total, current) => total + current, 0) / heightsTotal.length;
  const weightsAverage = weightsTotal.reduce( (total, current) => total + current, 0) / weightsTotal.length;

  // JSX:
  return (
    <>
      <li>Altura promedio: <b>{heightsAverage ? heightsAverage.toFixed(0) : 0 } cm.</b></li>
      <li>Peso promedio: <b>{weightsAverage ? weightsAverage.toFixed(0) : 0} kg.</b></li>
    </>
  );
}

export default AccumulativeStats;