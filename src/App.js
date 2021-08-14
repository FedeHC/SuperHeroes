// React:
import { useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Subcomponentes:
import LoginButton from "./subcomponents/LoginButton";
import LoginForm from "./subcomponents/LoginForm";
import MainView from "./subcomponents/MainView";
import HeroesSearch from "./subcomponents/HeroesSearch";
import HeroDetails from "./subcomponents/HeroDetails";
import Footer from "./subcomponents/Footer";

// Librerías y demás:
import axios from "axios";
import ApiToken from "./api.json";

// URLS:
const URL_ALKEMY = "http://challenge-react.alkemy.org";                   // Para obtener token.
const URL_CORS = "https://cors-anywhere.herokuapp.com";                   // Para sortear problema CORS en desarrollo.
const URL_SH = "https://superheroapi.com";                                // API de consulta.
const URL_SH_API = `${URL_CORS}/${URL_SH}/api/${ApiToken.value}/search/`; // URL completa de base para buscar.

// Constantes:
const MAX_PER_FACTION = 3;
const TOKEN_KEY = "Alkemy-token";
const EMAIL_KEY = "Email-user";
const LOGIN_OK = "LOGIN_OK";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const SHOW_MAINVIEW = "SHOW_MAINVIEW";
const SHOW_HEROES_SEARCH = "SHOW_HEROES_SEARCH";
const SHOW_HERO_DETAILS = "SHOW_HERO_DETAILS";


function App() {
  // --------------------------------------------------------------------------------
  // Estados (states, reducers)
  // --------------------------------------------------------------------------------
  // State que guarda todos los datos de 6 héroes.
  // A medida que el usuario agregue héroes, se guardarán con objetos obtenidos de la API.
  const [heroes, setHeroes] = useState([null, null, null, null, null, null]);
  
  // State que guarda temp. los resultados de búsquedas de héroes realizadas a la API:
  const [searchResults, setSearchResults] = useState(null);

  // Función reducer, con switch que controla las acciones posibles según string recibido.
  const viewReducer = (state, action) => {
    switch (action.type) {
      case LOGIN_OK:
        localStorage.setItem(TOKEN_KEY, action.payload.token);  // Guardando token en localStorage.
        localStorage.setItem(EMAIL_KEY, action.payload.email);  // Guardando email en localStorage.
        return {
          hasToken: true,
          hasError: false,
        }
      case LOGIN_ERROR:
        return {
          ...state,
          hasToken: false,
          hasError: true
        };
      case LOGOUT:
        localStorage.removeItem(TOKEN_KEY); // Borrando token en localStorage.
        localStorage.removeItem(EMAIL_KEY); // Borrando email en localStorage.
        return {
          ...state,
          hasToken: null,
          hasError: null,
        };
      case SHOW_MAINVIEW:
        return {
          ...state,
          userEmail: localStorage.getItem(EMAIL_KEY), // Obteniendo email desde localStorage, si existe.
          inMainView: true,       // Nueva vista actual.
          inHeroesSearch: false,  // Valor necesario si se viene desde esa vista.
          inHeroDetails: false,   // Valor necesario si se viene desde esa vista.
        };
      case SHOW_HEROES_SEARCH:
        return {
          ...state,
          inMainView: false,      // Valor necesario si se viene desde esa vista.
          inHeroesSearch: true,   // Nueva vista actual.
          inHeroDetails: false,   // Valor necesario si se viene desde esa vista.
          heroPosition: action.payload,
        };
      case SHOW_HERO_DETAILS:
        return {
          ...state,
          inMainView: false,      // Valor necesario si se viene desde esa vista.
          inHeroesSearch: false,  // Valor necesario si se viene desde esa vista.
          inHeroDetails: true,    // Nueva vista actual.
          heroPosition: action.payload
        };
      default:
        throw new Error("Valor imprevisto en action.type dentro de función viewReducer.");
    };
  }

  // Objeto inicial para reducer:
  const viewObj = {
    userEmail: localStorage.getItem(EMAIL_KEY),                 // Obteniendo email desde localStorage, si existe.
    hasToken: localStorage.getItem(TOKEN_KEY) ? true : null,    // Obteniendo token desde localStorage, si existe.
    hasError: null,
    inMainView: localStorage.getItem(TOKEN_KEY) ? true : null,  // Seteando vista a 'true' si existe token en localStorage.
    inHeroesSearch: null,
    inHeroDetails: null,
    heroPosition: null
  };

  // useReducer:
  const [view, setView] = useReducer(viewReducer, viewObj);

  // --------------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------------
  
  // Handler para obtener token de validación por API.
  // Se recibe objeto con mail y contraseña para la validación y el logueo.
  const getTokenHandler = async (formData) => {
    if (formData) {
      try {
        // Envio de datos por POST a la API, enviando objeto con mail y contraseña:
        const response = await axios.post(URL_ALKEMY, formData);

        // Si se recibe token, se guarda este y el mail para pasar a la vista 'Mainview':
        if (response.data.token) {
          setView({ type: LOGIN_OK, payload: {"token": response.data.token, "email": formData.email } } );
          setView({ type: SHOW_MAINVIEW });
        }
      }
      // Si se recibe error 401 es por no haber sido autorizado correctamente,
      // sea porque el mail y/o contraseña enviadas no son válidas.
      catch (error) {
        if (error.response.status === 401) {
          setView({ type: LOGIN_ERROR }); // Se permanece en vista 'Login', pero se envía mensaje de error.
        }
        
        // En cualquier otro caso, se permanece en vista 'Login' sin realizar acción alguna.
      }
    }
  };

  // Handler para mostrar vista 'MainView'.
  const getMainViewHandler = () => {
    setSearchResults([]);   // Borrando state que guarda los resultados de búsqueda.
    setView({ type: SHOW_MAINVIEW });
  };

  // Handler para el botón de agregar héroe.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const getHeroesSearch = (index) => {
    setView({type: SHOW_HEROES_SEARCH, payload: index  });
  };

  // Handler para el botón de mostrar detalles de un héroe.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const getHeroDetailsHandler = (index) => {
    setView({ type: SHOW_HERO_DETAILS, payload: index });
  };

  // Handler para realizar búsquedas a la API 'SuperHeroes'.
  // Se busca héroes de acuerdo al término de búsqueda recibido por formulario.
  const searchHeroHandler = async (heroName) => {
    try {
      // Envio de datos por GET a la API, con el término de búsqueda:
      const search = await axios.get(URL_SH_API + heroName.search);
      setSearchResults(search.data);  // Guardando resultados.
    }
    catch (error) {
      if (error.response && error.response.status) {
        console.error(`[Error ${error.response.status}]`);  // Mostrando error en consola.
        setSearchResults({ "response": "error", "error": error.response.status });
      }
      // Si no hubo 'error.response' es a causa de error CORS:
      else {
        console.error(error); // Mostrando error en consola.
        setSearchResults({ "response": "error", "error": "CORS" });
      }
    }
  };

  // Handler para el botón de agregar un héroe.
  // Se recibe índice con la posición del héroe en el equipo.
  const addHeroHandler = (index) => {
    const newHeroes = [];
    for (let c = 0; c < heroes.length; c++) {
      if (c === view.heroPosition)
        newHeroes[c] = searchResults.results[index];
      else
        newHeroes[c] = heroes[c];
    }
    setHeroes(newHeroes);
    getMainViewHandler();
  };

  // Handler para el botón de borrar héroe del equipo.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const deleteHeroHandler = (index) => {
    const updatedHeroes = [...heroes];
    updatedHeroes[index] = null;  // Borrando datos del heroe en la pos. recibida por índice.
    setHeroes(updatedHeroes);
  };

  // Handler para cerrar sesión y cambiar a vista 'Login'.
  const logOutHandler = () => {
    setView({ type: LOGOUT });
  }

  // --------------------------------------------------------------------------------
  // JSX
  // --------------------------------------------------------------------------------
  return (
    <>
      {/* Vista Login */}
      {!view.hasToken &&
        <LoginForm getTokenHandler={getTokenHandler}
                   errorMessage={view.hasError} />
      }

      {/* Vista MainView */}
      {view.hasToken && view.inMainView &&
        <>
          <LoginButton email={view.userEmail}
                       logOutHandler={logOutHandler} />

          <MainView heroes={heroes}
                    getHeroesSearch={getHeroesSearch}
                    deleteHeroHandler={deleteHeroHandler}
                    getHeroDetailsHandler={getHeroDetailsHandler} />
        </>
      }

      {/* Vista HeroGrid */}
      {view.hasToken && view.inHeroesSearch &&
        <>
          <LoginButton email={view.userEmail}
                       logOutHandler={logOutHandler} />

          <HeroesSearch heroes={heroes}
                        MAX_PER_FACTION={MAX_PER_FACTION}
                        getMainViewHandler={getMainViewHandler}
                        searchHeroHandler={searchHeroHandler}
                        searchResults={searchResults}
                        addHeroHandler={addHeroHandler} />
        </>
      }

      {/* Vista HeroDetails */}
      {view.hasToken && view.inHeroDetails &&
        <>
          <LoginButton email={view.userEmail}
                       setlogOutHandlerView={logOutHandler} />

          <HeroDetails hero={heroes[view.heroPosition]}
                       getMainViewHandler={getMainViewHandler} />
        </>
      }

      {/* En cualquier vista debe verse el footer: */}
      <Footer />
    </>
  );
}

export default App;
