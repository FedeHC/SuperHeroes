// React:
import { useState, useEffect } from "react";


// Hook personalizado para guardar un state de modo (semi) permanente en localStorage.
// Cada vez que la app se reinicia o se fuerza a recargar, los datos del state persisten.
const usePersistentState = (MAX_MEMBERS=1, STATE_KEY="persistentState") => {
  // Se crea array con X cant de 'null', de acuerdo a parámetro recibido:
  const emptyArrays = Array(MAX_MEMBERS).fill(null);

  // Se crea state según valores tomados en localStorage, si hay. 
  // Caso contrario con array de 'null's:
  const [values, setValues] = useState(JSON.parse(localStorage.getItem(STATE_KEY)) || emptyArrays);
  
  // Empleando 'useEffect' para guardar el state en localStorage en cada cambio o renderizado:
  useEffect(() => {
    localStorage.setItem(STATE_KEY,  JSON.stringify(values));
  }, [values, STATE_KEY]);

  return [values, setValues];
}

export default usePersistentState;
