import {
  ADMIN_CATEGORIAS_REQUEST,
  ADMIN_CATEGORIAS_SUCCESS,
  ADMIN_CATEGORIAS_FAIL,
  CREATE_CATEGORIA_REQUEST,
  CREATE_CATEGORIA_SUCCESS,
  CREATE_CATEGORIA_FAIL,
  CREATE_CATEGORIA_RESET,
  UPDATE_CATEGORIA_REQUEST,
  UPDATE_CATEGORIA_SUCCESS,
  UPDATE_CATEGORIA_FAIL,
  UPDATE_CATEGORIA_RESET,
  DELETE_CATEGORIA_REQUEST,
  DELETE_CATEGORIA_SUCCESS,
  DELETE_CATEGORIA_FAIL,
  DELETE_CATEGORIA_RESET,
  CATEGORIA_DETAILS_REQUEST,
  CATEGORIA_DETAILS_SUCCESS,
  CATEGORIA_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoriaConstants";

export const categoriasReducer = (state = { categorias: [] }, action) => {
  switch (action.type) {
    case ADMIN_CATEGORIAS_REQUEST:
      return {
        loading: true,
        categorias: [],
      };

    case ADMIN_CATEGORIAS_SUCCESS:
      return {
        loading: false,
        categorias: action.payload,
      };

    case ADMIN_CATEGORIAS_FAIL:
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

export const categoriaDetailsReducer = (state = { categoria: {} }, action) => {
  switch (action.type) {
    case CATEGORIA_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CATEGORIA_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        categoria: action.payload,
      };

    case CATEGORIA_DETAILS_FAIL:
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

export const createCategoriaReducer = (state = { categoria: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CATEGORIA_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        categoria: action.payload.categoria,
      };

    case CREATE_CATEGORIA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_CATEGORIA_RESET:
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

export const categoriaReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORIA_REQUEST:
    case UPDATE_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_CATEGORIA_FAIL:
    case UPDATE_CATEGORIA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_CATEGORIA_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_CATEGORIA_RESET:
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
