import extra from "./auxiliary.json";


// URL que brinda servicio para sortear el problema CORS en entorno de desarrollo.
// Si se quita, remover también de las otras 2 URLS:
const URL_CORS =  "https://cors-anywhere.herokuapp.com";

// URL para obtener token de autorización en login:
export const URL_ALKEMY = `${URL_CORS}/http://challenge-react.alkemy.org`;

// URL para realizar las búsquedas de héroes:
export const URL_SH_API = `${URL_CORS}/https://superheroapi.com/api/${extra.access_token}/search/`;

// Otros:
export const MAX_MEMBERS = 6;
export const MAX_PER_FACTION = 3;
export const STATE_KEY = "alkemy_state";
export const TOKEN_KEY = "alkemy_token";
export const EMAIL_KEY = "alkemy_email";
