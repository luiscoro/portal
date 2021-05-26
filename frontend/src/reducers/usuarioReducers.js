import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PERFIL_REQUEST,
  UPDATE_PERFIL_SUCCESS,
  UPDATE_PERFIL_RESET,
  UPDATE_PERFIL_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  REGISTRO_USUARIO_REQUEST,
  LOAD_USUARIO_REQUEST,
  REGISTRO_USUARIO_SUCCESS,
  LOAD_USUARIO_SUCCESS,
  LOAD_USUARIO_FAIL,
  REGISTRO_USUARIO_FAIL,
  UPDATE_USUARIO_REQUEST,
  UPDATE_USUARIO_SUCCESS,
  DELETE_USUARIO_SUCCESS,
  DELETE_USUARIO_RESET,
  GET_USUARIOS_SUCCESS,
  GET_USUARIOS_FAIL,
  USUARIO_DETAILS_REQUEST,
  USUARIO_DETAILS_SUCCESS,
  USUARIO_DETAILS_FAIL,
  DELETE_USUARIO_REQUEST,
  UPDATE_USUARIO_RESET,
  UPDATE_USUARIO_FAIL,
  DELETE_USUARIO_FAIL,
  GET_USUARIOS_REQUEST,
} from "../constants/usuarioConstants";

export const authReducer = (state = { usuario: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTRO_USUARIO_REQUEST:
    case LOAD_USUARIO_REQUEST:
      return {
        loading: true,
        authenticatedUsuario: false,
      };

    case LOGIN_SUCCESS:
    case REGISTRO_USUARIO_SUCCESS:
    case LOAD_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticatedUsuario: true,
        usuario: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        authenticatedUsuario: false,
        usuario: null,
      };

    case LOAD_USUARIO_FAIL:
      return {
        loading: false,
        authenticatedUsuario: false,
        usuario: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTRO_USUARIO_FAIL:
      return {
        ...state,
        loading: false,
        authenticatedUsuario: false,
        usuario: null,
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

export const usuarioReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PERFIL_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USUARIO_REQUEST:
    case DELETE_USUARIO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PERFIL_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_PERFIL_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USUARIO_RESET:
      return {
        ...state,
        esActualizado: false,
      };

    case DELETE_USUARIO_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_PERFIL_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USUARIO_FAIL:
    case DELETE_USUARIO_FAIL:
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
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

export const getUsuariosReducer = (state = { usuarios: [] }, action) => {
  switch (action.type) {
    case GET_USUARIOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USUARIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        usuarios: action.payload,
      };

    case GET_USUARIOS_FAIL:
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

export const usuarioDetailsReducer = (state = { usuario: {} }, action) => {
  switch (action.type) {
    case USUARIO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USUARIO_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        usuario: action.payload,
      };

    case USUARIO_DETAILS_FAIL:
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
