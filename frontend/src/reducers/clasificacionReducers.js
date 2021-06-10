import {
  ADMIN_CLASIFICACIONES_REQUEST,
  ADMIN_CLASIFICACIONES_SUCCESS,
  ADMIN_CLASIFICACIONES_FAIL,
  CREATE_CLASIFICACION_REQUEST,
  CREATE_CLASIFICACION_SUCCESS,
  CREATE_CLASIFICACION_FAIL,
  CREATE_CLASIFICACION_RESET,
  UPDATE_CLASIFICACION_REQUEST,
  UPDATE_CLASIFICACION_SUCCESS,
  UPDATE_CLASIFICACION_FAIL,
  UPDATE_CLASIFICACION_RESET,
  DELETE_CLASIFICACION_REQUEST,
  DELETE_CLASIFICACION_SUCCESS,
  DELETE_CLASIFICACION_FAIL,
  DELETE_CLASIFICACION_RESET,
  CLASIFICACION_DETAILS_REQUEST,
  CLASIFICACION_DETAILS_SUCCESS,
  CLASIFICACION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/clasificacionConstants";

export const clasificacionesReducer = (
  state = { clasificaciones: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_CLASIFICACIONES_REQUEST:
      return {
        loading: true,
        clasificaciones: [],
      };

    case ADMIN_CLASIFICACIONES_SUCCESS:
      return {
        loading: false,
        clasificaciones: action.payload.clasificaciones,
      };

    case ADMIN_CLASIFICACIONES_FAIL:
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

export const clasificacionDetailsReducer = (
  state = { clasificacion: {} },
  action
) => {
  switch (action.type) {
    case CLASIFICACION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CLASIFICACION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        clasificacion: action.payload,
      };

    case CLASIFICACION_DETAILS_FAIL:
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

export const createClasificacionReducer = (
  state = { clasificacion: {} },
  action
) => {
  switch (action.type) {
    case CREATE_CLASIFICACION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CLASIFICACION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        clasificacion: action.payload.clasificacion,
      };

    case CREATE_CLASIFICACION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_CLASIFICACION_RESET:
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

export const clasificacionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CLASIFICACION_REQUEST:
    case UPDATE_CLASIFICACION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CLASIFICACION_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_CLASIFICACION_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_CLASIFICACION_FAIL:
    case UPDATE_CLASIFICACION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CLASIFICACION_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_CLASIFICACION_RESET:
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
