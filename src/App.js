import { useState, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginForm from "./subcomponents/LoginForm";
import MainView from "./subcomponents/MainView";
import ApiToken from "./api.json";
import axios from "axios";


// URLS:
const URL_ALKEMY = "http://challenge-react.alkemy.org";
const URL_SH_API = "https://superheroapi.com/";

// Demás constantes:
const TOKEN_KEY = "Alkemy-token";

// APP:
function App() {
  // Función para reducer:
  const loginReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_OK":
        return {
          ...state,
          hasToken: true,
          hasError: false
        };
      case "LOGIN_ERROR":
        return {
          ...state,
          hasToken: false,
          hasError: true
        };
      default:
        throw new Error();
    };
  }

  // Objeto inicial para reducer:
  const loginObj = {
    hasToken: null,
    hasError: null
  };

  // useReducer:
  const [login, setLogin] = useReducer(loginReducer, loginObj);

  // Handlers:
  const getTokenHandler = async (data) => {
    if (data) {
      try {
        const response = await axios.post(URL_ALKEMY, data);
        if (response.data.token) {
          localStorage.setItem(TOKEN_KEY, response.data.token)  // Guardando token en localStorage.
          setLogin({ type: "LOGIN_OK" });                           // Cambiando estado en reducer.
        } 
      }
      catch(error){
        if (error.response.status === 401) {
          setLogin({ type: "LOGIN_ERROR" });                        // Cambiando estado en reducer.
        }
      }
    }
  };

  return (
    <>
      {!login.hasToken &&
        <LoginForm getTokenHandler={getTokenHandler}
                   errorMessage={login.hasError} />
      }
      {login.hasToken &&
        <MainView />
      }
    </>
  );
}

export default App;
