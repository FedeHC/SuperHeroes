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
const SHOW_HEROES_GRID = "SHOW_HEROES_GRID";
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
  const [searchResults, setSearchResults] = useState([]);

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
          inHeroesGrid: false,
          inHeroDetails: false
        };
      case SHOW_HEROES_GRID:
        return {
          ...state,
          inMainView: false,
          inHeroesGrid: true,
          inHeroDetails: false
        };
      case SHOW_HERO_DETAILS:
        return {
          ...state,
          inMainView: false,
          inHeroesGrid: false,
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
    inHeroesGrid: null,
    inHeroDetails: null
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

  const getHeroGridHandler = () => {
    setView({ type: SHOW_HEROES_GRID });                        // Cambiando a vista HeroesGrid.
  };

  const getHeroDetailsHandler = () => {
    setView({ type: SHOW_HERO_DETAILS });                       // Cambiando a vista HeroDetails.
  };

  const searchHeroHandler = async (heroName) => {
    try {
      const search = await axios.get(URL_SH_API + heroName.search);

      if (search.data.results) {
        setSearchResults(search.data.results);
      }
    }
    catch (error) {
      if (error.response.status === 401) {
        console.error(`- Error status: ${error.response.status}`)
      }
    }
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
                  setHeroes={setHeroes}
                  getHeroGridHandler={getHeroGridHandler} />
      }

      {/* Vista HeroGrid */}
      {view.hasToken && view.inHeroesGrid &&
        <HeroesSearch getMainViewHandler={getMainViewHandler}
                      searchHeroHandler={searchHeroHandler}
                      searchResults={searchResults} />
      }
    </>
  );
}

export default App;
