// React:
import { useState, useReducer } from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Subcomponentes:
import LoginButton from "./subcomponents/LoginButton";
import LoginForm from "./subcomponents/LoginForm";
import MainView from "./subcomponents/MainView";
import HeroesSearch from "./subcomponents/HeroesSearch";
import HeroDetails from "./subcomponents/HeroDetails";

// Librerías:
import axios from "axios";

// Archivo JSON:
import ApiToken from "./api.json";


// URLS:
const URL_ALKEMY = "http://challenge-react.alkemy.org"; // Para obtener token.
const URL_CORS = "https://cors-anywhere.herokuapp.com"; // Para sortear problema CORS en entorno de desarrollo.
const URL_SH = "https://superheroapi.com";              // API de consulta.
const URL_SH_API = `${URL_CORS}/${URL_SH}/api/${ApiToken.value}/search/`; // URL completa de base para buscar.

// Constantes útiles:
const TOKEN_KEY = "Alkemy-token";
const LOGIN_OK = "LOGIN_OK";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const SHOW_MAINVIEW = "SHOW_MAINVIEW";
const SHOW_HEROES_SEARCH = "SHOW_HEROES_SEARCH";
const SHOW_HERO_DETAILS = "SHOW_HERO_DETAILS";


function App() {
  // --------------------------------------------------------------------------------
  // Estados
  // --------------------------------------------------------------------------------
  // State que guarda todos los datos de 6 heroes.
  // C/u empieza null y a medida que el user agregue heroes se poblarán con objetos obtenidos por API.
  const [heroes, setHeroes] = useState([null, null, null, null, null, null]);
  
  // State que guarda temporalmente los resultados de las últimas búsquedas de heroes 
  // realizadas a la API:
  const [searchResults, setSearchResults] = useState(null);

  const viewReducer = (state, action) => {
    switch (action.type) {
      case LOGIN_ERROR:
        return {
          ...state,
          hasToken: false,
          hasError: true
        };
      case LOGOUT:
        return {
          ...state,
          hasToken: null,
          hasError: null,
        };
      case SHOW_MAINVIEW:
        return {
          ...state,
          userEmail: action.payload,
          hasToken: true,
          hasError: false,
          inMainView: true,
          inHeroesSearch: false,
          inHeroDetails: false
        };
      case SHOW_HEROES_SEARCH:
        return {
          ...state,
          inMainView: false,
          inHeroesSearch: true,
          inHeroDetails: false,
          heroPosition: action.payload
        };
      case SHOW_HERO_DETAILS:
        return {
          ...state,
          inMainView: false,
          inHeroesSearch: false,
          inHeroDetails: true,
          heroPosition: action.payload
        };
      default:
        throw new Error();
    };
  }

  // Objeto inicial para reducer:
  const viewObj = {
    userEmail: null,
    hasToken: null,
    hasError: null,
    inMainView: null,
    inHeroesSearch: null,
    inHeroDetails: null,
    heroPosition: null
  };

  // useReducer:
  const [view, setView] = useReducer(viewReducer, viewObj);

  // --------------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------------
  const getTokenHandler = async (data) => {
    if (data) {
      try {
        const response = await axios.post(URL_ALKEMY, data);

        if (response.data.token) {
          localStorage.setItem(TOKEN_KEY, response.data.token)  // Guardando token en localStorage.
          setView({ type: SHOW_MAINVIEW, payload: data.email });      // Cambiando a vista MainView.
        }
      }
      catch (error) {
        if (error.response.status === 401) {
          setView({ type: LOGIN_ERROR });                       // Cambiando estado en reducer (se permanece en Vista Login).
        }
      }
    }
  };

  const getMainViewHandler = () => {
    setSearchResults([]);                                       // Borrando últimos resultados.
    setView({ type: SHOW_MAINVIEW, payload: view.userEmail });  // Cambiando a vista MainView.
  };

  const getHeroesSearch = (index) => {
    setView({type: SHOW_HEROES_SEARCH, payload: index  });      // Cambiando a vista HeroesSearch y
  };                                                            // pasando posición en equipo.

  const getHeroDetailsHandler = (index) => {
    setView({ type: SHOW_HERO_DETAILS, payload: index });       // Cambiando a vista HeroDetails y
  };                                                            // pasando posición en equipo.

  const searchHeroHandler = async (heroName) => {
    try {
      const search = await axios.get(URL_SH_API + heroName.search);
      setSearchResults(search.data);                            // Guardando resultados.
    }
    catch (error) {
      if (error.response && error.response.status) {
        console.error(`[Error ${error.response.status}]`);      // Mostrando error en consola.
        setSearchResults({ "response": "error", "error": error.response.status });
      }
      // Si no hubo error.response es a causa de error CORS:
      else {
        console.error(error);                                   // Mostrando error en consola.
        setSearchResults({ "response": "error", "error": "CORS" });
      }
    }
  };

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

  const deleteHeroHandler = (index) => {
    const updatedHeroes = [...heroes];                          // Guardando array heroes en nueva variable.
    updatedHeroes[index] = null;                                // Borrando datos del heroe en la pos. (índice) recibida.
    setHeroes(updatedHeroes);                                   // Actualizando state heroes con nuevos valores.
  };

  const logOutHandler = () => {
    setView({ type: LOGOUT });                                  // Cerrando sesión y cambiando a vista Login.
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
    </>
  );
}

export default App;
