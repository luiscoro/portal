import {
  ADMIN_POSICIONES_REQUEST,
  ADMIN_POSICIONES_SUCCESS,
  ADMIN_POSICIONES_FAIL,
  CREATE_POSICION_REQUEST,
  CREATE_POSICION_SUCCESS,
  CREATE_POSICION_FAIL,
  CREATE_POSICION_RESET,
  UPDATE_POSICION_REQUEST,
  UPDATE_POSICION_SUCCESS,
  UPDATE_POSICION_FAIL,
  UPDATE_POSICION_RESET,
  DELETE_POSICION_REQUEST,
  DELETE_POSICION_SUCCESS,
  DELETE_POSICION_FAIL,
  DELETE_POSICION_RESET,
  POSICION_DETAILS_REQUEST,
  POSICION_DETAILS_SUCCESS,
  POSICION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/posicionConstants";

export const posicionesReducer = (state = { posiciones: [] }, action) => {
  switch (action.type) {
    case ADMIN_POSICIONES_REQUEST:
      return {
        loading: true,
        posiciones: [],
      };

    case ADMIN_POSICIONES_SUCCESS:
      return {
        loading: false,
        posiciones: action.payload,
      };

    case ADMIN_POSICIONES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const posicionDetailsReducer = (state = { posicion: {} }, action) => {
  switch (action.type) {
    case POSICION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POSICION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        posicion: action.payload,
      };

    case POSICION_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const createPosicionReducer = (state = { posicion: {} }, action) => {
  switch (action.type) {
    case CREATE_POSICION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_POSICION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        posicion: action.payload.posicion,
      };

    case CREATE_POSICION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_POSICION_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const posicionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POSICION_REQUEST:
    case UPDATE_POSICION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_POSICION_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_POSICION_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_POSICION_FAIL:
    case UPDATE_POSICION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_POSICION_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_POSICION_RESET:
      return {
        ...state,
        esActualizado: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
