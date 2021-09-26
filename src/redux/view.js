import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY, EMAIL_KEY } from "../consts";


export const viewSlice = createSlice(
  {
    name: "view",

    // Objeto con el estado inicial a usar en función reducer:
    initialState: {
      userEmail: localStorage.getItem(EMAIL_KEY),                 // Obteniendo email desde localStorage, si existe.
      hasToken: localStorage.getItem(TOKEN_KEY) ? true : null,    // Obteniendo token desde localStorage, si existe.
      hasError: null,
      inMainView: localStorage.getItem(TOKEN_KEY) ? true : null,  // Seteando vista a 'true' si existe token en localStorage.
      heroPosition: null
    },

    // Función reducer:
    reducers: {
      loginOK: (state, action) => {
        localStorage.setItem(TOKEN_KEY, action.payload.token);  // Guardando token en localStorage.
        localStorage.setItem(EMAIL_KEY, action.payload.email);  // Guardando email en localStorage.
        state.hasToken = true;
        state.hasError = false;
      },
      loginError: (state, action) => {
        state.hasToken = false;
        state.hasError = action.payload.error;
      },
      logOut: (state) => {
        localStorage.removeItem(TOKEN_KEY); // Borrando token en localStorage.
        localStorage.removeItem(EMAIL_KEY); // Borrando email en localStorage.
        state.hasToken = null;
        state.hasError = null;
      },
      showMainView: (state) => {
        state.userEmail = localStorage.getItem(EMAIL_KEY); // Obteniendo email desde localStorage, si existe.
      },
      showHeroesSearch: (state, action) => {
        state.heroPosition = action.payload.position;
      }
    }
  }
);

export const { loginOK, loginError, logOut, showMainView, showHeroesSearch } = viewSlice.actions;
export default viewSlice.reducer;
