// React:
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginOK, loginError, logOut, showMainView, showHeroesSearch } from "./redux/view";
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
import { MAX_MEMBERS, MAX_PER_FACTION, STATE_KEY, URL_ALKEMY, URL_SH_API, } from "./consts";


function App() {
  // --------------------------------------------------------------------------------
  // States
  // --------------------------------------------------------------------------------
  // Hook personalizado que guardará todos los datos de los 6 miembros del equipo.
  // El usuario agrega héroes y estos se guardan como objetos (obtenidos por API) al array:
  const [heroes, setHeroes] = usePersistentState(MAX_MEMBERS, STATE_KEY);
  
  // State que guarda temp. los resultados de búsquedas de héroes (objetos obtenidos por API):
  const [searchResults, setSearchResults] = useState(null);

  // Redux hooks:
  const storeState = useSelector( (state) => state.view);
  const dispatch = useDispatch();

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
          dispatch(loginOK({"token": response.data.token, "email": formData.email }));
          dispatch(showMainView());
          history.push("/index");
        }
      }
      // Si se recibe error (401, 403, etc.), tomar tipo de error y permanece en vista 'Login':
      catch (error) {
        if (error.response.status) {
          dispatch(loginError({ "error": error.response.status }));
        }
      }
    }
  };

  // Handler para mostrar vista 'MainView'.
  const getMainViewHandler = (history) => {
    setSearchResults([]);   // Borrando state que guarda los resultados de búsqueda.
    dispatch(showMainView());
    history.push("/index");
  };

  // Handler para el botón de agregar héroe.
  // Se recibe índice con la posición del mismo dentro del equipo.
  const getSearchView = (index, history) => {
    dispatch(showHeroesSearch({ position: index }));
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
      if (c === storeState.heroPosition)
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
    dispatch(logOut());
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
          {!storeState.hasToken ?
            <>
              <LoginView getTokenHandler={getTokenHandler}
                         errorMessage={storeState.hasError} />
              <Footer />
            </>
            
          // Si existe token, ir a 'MainView':
          : <Redirect to="/index" />
          }
        </Route>
  
        {/* Vista MainView */}
        <Route path="/index">
          {/* Si existe token, ir a 'Mainview' */}
          {storeState.hasToken ?
            <>
              <Nav email={storeState.userEmail}
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
          {storeState.hasToken ?
            <>
              <Nav email={storeState.userEmail}
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
          {storeState.hasToken ?
            <>
              <Nav email={storeState.userEmail}
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
          {storeState.hasToken ? <Redirect to="/index" /> : <Redirect to="/login" /> }
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
