// React:
import { useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Subcomponentes:
import usePersistentState from "./subcomponents/PersistentState";
import LoginView from "./subcomponents/LoginView";
import MainView from "./subcomponents/MainView";
import SearchView from "./subcomponents/SearchView";
import DetailsView from "./subcomponents/DetailsView";
import Nav from "./subcomponents/Nav";
import Footer from "./subcomponents/Footer";

// Librerías y demás:
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import extra from "./aux.json";

// --------------------------------------------------------------------------------
// Constantes
// --------------------------------------------------------------------------------
// URL para sortear problema CORS en entorno de desarrollo:
const URL_CORS =  "https://cors-anywhere.herokuapp.com";
// URL para obtener token de autorización en login:
const URL_ALKEMY = `${URL_CORS}/http://challenge-react.alkemy.org`;
// URL para realizar las búsquedas de héroes:
const URL_SH_API = `${URL_CORS}/https://superheroapi.com/api/${extra.access_token}/search/`;

// Otros:
const MAX_MEMBERS = 6;
const MAX_PER_FACTION = 3;
const STATE_KEY = "alkemy_state";
const TOKEN_KEY = "alkemy_token";
const EMAIL_KEY = "alkemy_email";
const LOGIN_OK = "LOGIN_OK";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const SHOW_MAINVIEW = "SHOW_MAINVIEW";
const SHOW_HEROES_SEARCH = "SHOW_HEROES_SEARCH";


function App() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  // Hook personalizado que guardará todos los datos de los 6 miembros del equipo.
  // El usuario agrega héroes y estos se guardan como objetos (obtenidos por API) al array:
  const [heroes, setHeroes] = usePersistentState(MAX_MEMBERS, STATE_KEY);
  
  // State que guarda temp. los resultados de búsquedas de héroes (objetos obtenidos por API):
  const [searchResults, setSearchResults] = useState(null);

  // Función reducer para useReducer:
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
          hasError: action.payload,
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
        };
      case SHOW_HEROES_SEARCH:
        return {
          ...state,
          heroPosition: action.payload,
        };
      default:
        throw new Error("Valor imprevisto en action.type dentro de función viewReducer.");
    };
  }

  // Objeto con determinado estado inicial para useReducer:
  const viewObj = {
    userEmail: localStorage.getItem(EMAIL_KEY),                 // Obteniendo email desde localStorage, si existe.
    hasToken: localStorage.getItem(TOKEN_KEY) ? true : null,    // Obteniendo token desde localStorage, si existe.
    hasError: null,
    inMainView: localStorage.getItem(TOKEN_KEY) ? true : null,  // Seteando vista a 'true' si existe token en localStorage.
    heroPosition: null
  };

  // useReducer que lleva el control de la transición a distintas vistas en la app:
  const [view, setView] = useReducer(viewReducer, viewObj);

  // --------------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------------
  
  // Handler para obtener token de validación por API.
  // Se recibe objeto con mail y contraseña para la validación y el logueo.
  const getTokenHandler = async (formData, history) => {
    if (formData) {
      try {
        // Envio de datos por POST a la API, enviando objeto con mail y contraseña:
        const response = await axios.post(URL_ALKEMY, formData);

        // Si se recibe token, se guarda este y el mail para pasar a la vista 'Mainview':
        if (response.data.token) {
          setView({ type: LOGIN_OK, payload: {"token": response.data.token, "email": formData.email } } );
          setView({ type: SHOW_MAINVIEW });
          history.push("/index");
        }
      }
      // Si se recibe error (401, 403, etc.), tomar tipo de error y permanece en vista 'Login':
      catch (error) {
        if (error.response.status) {
          setView({ type: LOGIN_ERROR, payload: error.response.status });
        }
      }
    }
  };

  // Handler para mostrar vista 'MainView'.
  const getMainViewHandler = (history) => {
    setSearchResults([]);   // Borrando state que guarda los resultados de búsqueda.
    setView({ type: SHOW_MAINVIEW });
    history.push("/index");
  };

  // Handler para el botón de agregar héroe.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const getSearchView = (index, history) => {
    setView({type: SHOW_HEROES_SEARCH, payload: index  });
    history.push("/search");
  };

  // Handler para el botón de mostrar detalles de un héroe.
  // Se recibe índice con la posición del miembro.
  const getDetailsViewHandler = (member, history) => {
    history.push(`/details/${member}`);
  };

  // Handler para realizar búsquedas a la API 'SuperHeroes'.
  // Se busca héroes de acuerdo al término de búsqueda recibido por formulario.
  const searchHeroHandler = async (formResults) => {
    try {
      // Envio de datos por GET a la API, con el término de búsqueda:
      const search = await axios.get(URL_SH_API + formResults.search);
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
  const addHeroHandler = (index, history) => {
    const newHeroes = [];
    for (let c = 0; c < heroes.length; c++) {
      if (c === view.heroPosition)
        newHeroes[c] = searchResults.results[index];
      else
        newHeroes[c] = heroes[c];
    }
    setHeroes(newHeroes);
    getMainViewHandler(history);
  };

  // Handler para el botón de borrar héroe del equipo.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const deleteHeroHandler = (index) => {
    const updatedHeroes = [...heroes];
    updatedHeroes[index] = null;  // Borrando datos del heroe en la pos. recibida por índice.
    setHeroes(updatedHeroes);
  };

  // Handler para cerrar sesión y cambiar a vista 'Login'.
  const logOutHandler = (history) => {
    setView({ type: LOGOUT });
    history.push("/login");
  }

  // --------------------------------------------------------------------------------
  // JSX
  // --------------------------------------------------------------------------------
  return (
    // Usando React-Router para las rutas.
    <Router>
      <Switch>
        {/* Vista Login */}
        <Route path="/login">
          {/* Si no existe token, ir a 'Login': */}
          {!view.hasToken ?
            <>
              <LoginView getTokenHandler={getTokenHandler}
                         errorMessage={view.hasError} />
              <Footer />
            </>
            
          // Si existe token, ir a 'MainView':
          : <Redirect to="/index" />
          }
        </Route>
  
        {/* Vista MainView */}
        <Route path="/index">
          {/* Si existe token, ir a 'Mainview' */}
          {view.hasToken ?
            <>
              <Nav email={view.userEmail}
                   logOutHandler={logOutHandler} />

              <MainView heroes={heroes}
                        getSearchView={getSearchView}
                        deleteHeroHandler={deleteHeroHandler}
                        getDetailsViewHandler={getDetailsViewHandler} />
              <Footer />
            </>
            // Si no existe token, ir a 'Login':
            : <Redirect to="/login" />
          }
        </Route>

        {/* Vista HeroGrid */}
        <Route path="/search">
          {/* Si existe token, ir a 'SearchView' */}
          {view.hasToken ?
            <>
              <Nav email={view.userEmail}
                   logOutHandler={logOutHandler} />

              <SearchView heroes={heroes}
                          MAX_PER_FACTION={MAX_PER_FACTION}
                          getMainViewHandler={getMainViewHandler}
                          searchHeroHandler={searchHeroHandler}
                          searchResults={searchResults}
                          addHeroHandler={addHeroHandler} />
              <Footer />
            </>
            // Si no existe token, ir a 'Login':
            : <Redirect to="/login" />
          }
        </Route>

        {/* Vista DetailsView */}
        <Route path="/details/:member">
          {/* Si existe token, ir a 'DetailsView' */}
          {view.hasToken ?
            <>
              <Nav email={view.userEmail}
                   logOutHandler={logOutHandler} />

              <DetailsView heroes={heroes}
                           getMainViewHandler={getMainViewHandler} />
              <Footer />
            </>
            // Si no existe token, ir a 'Login':
            : <Redirect to="/login" />
          }
        </Route>

        {/* Cualquier otra ruta o path: */}
        <Route path="*">
          {view.hasToken ? <Redirect to="/index" /> : <Redirect to="/login" /> }
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
