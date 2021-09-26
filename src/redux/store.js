import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './view'
;
// Creando store de Redux:
export default configureStore({
  reducer: {
    view: viewReducer
  }
});