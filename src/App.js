// React-Bootstrap:
import { useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Subcomponentes:
import LoginForm from "./subcomponents/LoginForm";
import MainView from "./subcomponents/MainView";

// Librerías:
import axios from "axios";

// Archivo JSON:
import ApiToken from "./api.json";


// URLS:
const URL_ALKEMY = "http://challenge-react.alkemy.org";
const URL_SH_API = "https://superheroapi.com/";

// Demás constantes:
const TOKEN_KEY = "Alkemy-token";
const LOGIN_OK = "LOGIN_OK";
const LOGIN_ERROR = "LOGIN_ERROR";
const SHOW_MAIN = "SHOW_MAIN";
const SHOW_HEROES_GRID = "SHOW_HEROES_GRID";
const SHOW_HERO_DETAILS = "SHOW_HERO_DETAILS";


function App() {
  // --------------------------------------------------------------------------------
  // Estados
  // --------------------------------------------------------------------------------
  const [heroesArray, setHeroesArray] = useState([0, 0, 0, 0, 0, 0]);

  const viewReducer = (state, action) => {
    switch (action.type) {
      case LOGIN_ERROR:
        return {
          ...state,
          hasToken: false,
          hasError: true
        };
      case SHOW_MAIN:
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
          localStorage.setItem(TOKEN_KEY, response.data.token)      // Guardando token en localStorage.
          setView({ type: SHOW_MAIN });                             // Cambiando estado en reducer.
        }
      }
      catch (error) {
        if (error.response.status === 401) {
          setView({ type: LOGIN_ERROR });                          // Cambiando estado en reducer.
        }
      }
    }
  };

  // --------------------------------------------------------------------------------
  // JSX
  // --------------------------------------------------------------------------------
  return (
    <>
      {/* Login */}
      {!view.hasToken &&
        <LoginForm getTokenHandler={getTokenHandler}
                   errorMessage={view.hasError} />
      }

      {/* MainView */}
      {view.hasToken &&
        <MainView heroes={heroesArray}
                  setHeroes={setHeroesArray} />
      }
    </>
  );
}

export default App;
