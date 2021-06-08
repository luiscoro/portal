import {
  ADMIN_DIRIGENTES_REQUEST,
  ADMIN_DIRIGENTES_SUCCESS,
  ADMIN_DIRIGENTES_FAIL,
  CREATE_DIRIGENTE_REQUEST,
  CREATE_DIRIGENTE_SUCCESS,
  CREATE_DIRIGENTE_FAIL,
  CREATE_DIRIGENTE_RESET,
  UPDATE_DIRIGENTE_REQUEST,
  UPDATE_DIRIGENTE_SUCCESS,
  UPDATE_DIRIGENTE_FAIL,
  UPDATE_DIRIGENTE_RESET,
  DELETE_DIRIGENTE_REQUEST,
  DELETE_DIRIGENTE_SUCCESS,
  DELETE_DIRIGENTE_FAIL,
  DELETE_DIRIGENTE_RESET,
  DIRIGENTE_DETAILS_REQUEST,
  DIRIGENTE_DETAILS_SUCCESS,
  DIRIGENTE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/dirigenteConstants";

export const dirigentesReducer = (state = { dirigentes: [] }, action) => {
  switch (action.type) {
    case ADMIN_DIRIGENTES_REQUEST:
      return {
        loading: true,
        dirigentes: [],
      };

    case ADMIN_DIRIGENTES_SUCCESS:
      return {
        loading: false,
        dirigentes: action.payload,
      };

    case ADMIN_DIRIGENTES_FAIL:
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

export const dirigenteDetailsReducer = (state = { dirigente: {} }, action) => {
  switch (action.type) {
    case DIRIGENTE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DIRIGENTE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        dirigente: action.payload,
      };

    case DIRIGENTE_DETAILS_FAIL:
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

export const createDirigenteReducer = (state = { dirigente: {} }, action) => {
  switch (action.type) {
    case CREATE_DIRIGENTE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_DIRIGENTE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        dirigente: action.payload.dirigente,
      };

    case CREATE_DIRIGENTE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_DIRIGENTE_RESET:
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

export const dirigenteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DIRIGENTE_REQUEST:
    case UPDATE_DIRIGENTE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_DIRIGENTE_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_DIRIGENTE_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_DIRIGENTE_FAIL:
    case UPDATE_DIRIGENTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_DIRIGENTE_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_DIRIGENTE_RESET:
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
