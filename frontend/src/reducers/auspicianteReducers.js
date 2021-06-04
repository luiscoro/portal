import {
  ADMIN_AUSPICIANTES_REQUEST,
  ADMIN_AUSPICIANTES_SUCCESS,
  ADMIN_AUSPICIANTES_FAIL,
  CREATE_AUSPICIANTE_REQUEST,
  CREATE_AUSPICIANTE_SUCCESS,
  CREATE_AUSPICIANTE_FAIL,
  CREATE_AUSPICIANTE_RESET,
  UPDATE_AUSPICIANTE_REQUEST,
  UPDATE_AUSPICIANTE_SUCCESS,
  UPDATE_AUSPICIANTE_FAIL,
  UPDATE_AUSPICIANTE_RESET,
  DELETE_AUSPICIANTE_REQUEST,
  DELETE_AUSPICIANTE_SUCCESS,
  DELETE_AUSPICIANTE_FAIL,
  DELETE_AUSPICIANTE_RESET,
  AUSPICIANTE_DETAILS_REQUEST,
  AUSPICIANTE_DETAILS_SUCCESS,
  AUSPICIANTE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/auspicianteConstants";

export const auspiciantesReducer = (state = { auspiciantes: [] }, action) => {
  switch (action.type) {
    case ADMIN_AUSPICIANTES_REQUEST:
      return {
        loading: true,
        auspiciantes: [],
      };

    case ADMIN_AUSPICIANTES_SUCCESS:
      return {
        loading: false,
        auspiciantes: action.payload,
      };

    case ADMIN_AUSPICIANTES_FAIL:
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

export const auspicianteDetailsReducer = (
  state = { auspiciante: {} },
  action
) => {
  switch (action.type) {
    case AUSPICIANTE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUSPICIANTE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        auspiciante: action.payload,
      };

    case AUSPICIANTE_DETAILS_FAIL:
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

export const createAuspicianteReducer = (
  state = { auspiciante: {} },
  action
) => {
  switch (action.type) {
    case CREATE_AUSPICIANTE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_AUSPICIANTE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        auspiciante: action.payload.auspiciante,
      };

    case CREATE_AUSPICIANTE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_AUSPICIANTE_RESET:
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

export const auspicianteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AUSPICIANTE_REQUEST:
    case UPDATE_AUSPICIANTE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_AUSPICIANTE_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_AUSPICIANTE_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_AUSPICIANTE_FAIL:
    case UPDATE_AUSPICIANTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_AUSPICIANTE_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_AUSPICIANTE_RESET:
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
