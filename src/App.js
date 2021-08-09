// React-Bootstrap:
import { useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Subcomponentes:
import LoginForm from "./subcomponents/LoginForm";
import MainView from "./subcomponents/MainView";
import HeroesSearch from "./subcomponents/HeroesSearch";

// Librerías:
import axios from "axios";

// Archivo JSON:
import ApiToken from "./api.json";


// URLS:
const URL_ALKEMY = "http://challenge-react.alkemy.org"; // Para obtener token.
const URL_CORS = "https://cors-anywhere.herokuapp.com"; // Para sortear problema CORS.
const URL_SH = "https://superheroapi.com";              // API de consulta.
const URL_SH_API = `${URL_CORS}/${URL_SH}/api/${ApiToken.value}/search/`; // URL completa de base para buscar.

// Demás constantes:
const TOKEN_KEY = "Alkemy-token";
const LOGIN_ERROR = "LOGIN_ERROR";
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
      case SHOW_MAINVIEW:
        return {
          ...state,
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
          inHeroDetails: true
        };
      default:
        throw new Error();
    };
  }

  // Objeto inicial para reducer:
  const viewObj = {
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
          setView({ type: SHOW_MAINVIEW });                     // Cambiando a vista MainView.
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
    setView({ type: SHOW_MAINVIEW });                           // Cambiando a vista MainView.
  };

  const getHeroesSearch = (index) => {
    setView({
              type: SHOW_HEROES_SEARCH,                         // Cambiando a vista HeroesSearch.
              payload: index                                    // Pasando posición en equipo.
            });
  };

  const getHeroDetailsHandler = () => {
    setView({ type: SHOW_HERO_DETAILS });                       // Cambiando a vista HeroDetails.
  };

  const searchHeroHandler = async (heroName) => {
    try {
      const search = await axios.get(URL_SH_API + heroName.search);
      setSearchResults(search.data);                            // Guardando resultados.
    }
    catch (error) {
      if (error.response.status === 401) {
        console.error(`- Error status: ${error.response.status}`)
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
    const updatedHeroes = [... heroes];                               // Guardando array heroes en nueva variable.
    updatedHeroes[index] = null;                                      // Borrando datos del heroe en indice recibido.
    setHeroes(updatedHeroes);                                         // Actualizando state heroes con nuevos valores.
  };

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
        <MainView heroes={heroes}
                  getHeroesSearch={getHeroesSearch}
                  deleteHeroHandler={deleteHeroHandler} />
      }

      {/* Vista HeroGrid */}
      {view.hasToken && view.inHeroesSearch &&
        <HeroesSearch getMainViewHandler={getMainViewHandler}
                      searchHeroHandler={searchHeroHandler}
                      searchResults={searchResults}
                      addHeroHandler={addHeroHandler} />
      }
    </>
  );
}

export default App;
