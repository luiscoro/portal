import {
  ADMIN_PARTIDOS_REQUEST,
  ADMIN_PARTIDOS_SUCCESS,
  ADMIN_PARTIDOS_FAIL,
  TOP_PARTIDO_REQUEST,
  TOP_PARTIDO_SUCCESS,
  TOP_PARTIDO_FAIL,
  LAST_PARTIDOS_REQUEST,
  LAST_PARTIDOS_SUCCESS,
  LAST_PARTIDOS_FAIL,
  NEXT_PARTIDOS_REQUEST,
  NEXT_PARTIDOS_SUCCESS,
  NEXT_PARTIDOS_FAIL,
  CREATE_PARTIDO_REQUEST,
  CREATE_PARTIDO_SUCCESS,
  CREATE_PARTIDO_FAIL,
  CREATE_PARTIDO_RESET,
  UPDATE_PARTIDO_REQUEST,
  UPDATE_PARTIDO_SUCCESS,
  UPDATE_PARTIDO_FAIL,
  UPDATE_PARTIDO_RESET,
  DELETE_PARTIDO_REQUEST,
  DELETE_PARTIDO_SUCCESS,
  DELETE_PARTIDO_FAIL,
  DELETE_PARTIDO_RESET,
  PARTIDO_DETAILS_REQUEST,
  PARTIDO_DETAILS_SUCCESS,
  PARTIDO_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/partidoConstants";

export const partidosReducer = (state = { partidos: [] }, action) => {
  switch (action.type) {
    case TOP_PARTIDO_REQUEST:
    case NEXT_PARTIDOS_REQUEST:
    case ADMIN_PARTIDOS_REQUEST:
      return {
        loading: true,
        partidos: [],
      };

    case TOP_PARTIDO_SUCCESS:
    case NEXT_PARTIDOS_SUCCESS:
    case ADMIN_PARTIDOS_SUCCESS:
      return {
        loading: false,
        partidos: action.payload,
      };

    case TOP_PARTIDO_FAIL:
    case NEXT_PARTIDOS_FAIL:
    case ADMIN_PARTIDOS_FAIL:
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

export const resultadosReducer = (state = { resultados: [] }, action) => {
  switch (action.type) {
    case LAST_PARTIDOS_REQUEST:
      return {
        loading: true,
        resultados: [],
      };

    case LAST_PARTIDOS_SUCCESS:
      return {
        loading: false,
        resultados: action.payload,
      };

    case LAST_PARTIDOS_FAIL:
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

export const partidoDetailsReducer = (state = { partido: {} }, action) => {
  switch (action.type) {
    case PARTIDO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PARTIDO_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        partido: action.payload,
      };

    case PARTIDO_DETAILS_FAIL:
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

export const createPartidoReducer = (state = { partido: {} }, action) => {
  switch (action.type) {
    case CREATE_PARTIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PARTIDO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        partido: action.payload.partido,
      };

    case CREATE_PARTIDO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_PARTIDO_RESET:
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

export const partidoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PARTIDO_REQUEST:
    case UPDATE_PARTIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PARTIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_PARTIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_PARTIDO_FAIL:
    case UPDATE_PARTIDO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PARTIDO_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_PARTIDO_RESET:
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
