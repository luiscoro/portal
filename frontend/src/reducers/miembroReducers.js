import {
  ADMIN_MIEMBROS_REQUEST,
  ADMIN_MIEMBROS_SUCCESS,
  ADMIN_MIEMBROS_FAIL,
  GET_JUGADORES_REQUEST,
  GET_JUGADORES_SUCCESS,
  GET_JUGADORES_FAIL,
  GET_CUERPO_MEDICO_REQUEST,
  GET_CUERPO_MEDICO_SUCCESS,
  GET_CUERPO_MEDICO_FAIL,
  GET_CUERPO_TECNICO_REQUEST,
  GET_CUERPO_TECNICO_SUCCESS,
  GET_CUERPO_TECNICO_FAIL,
  CREATE_MIEMBRO_REQUEST,
  CREATE_MIEMBRO_SUCCESS,
  CREATE_MIEMBRO_FAIL,
  CREATE_MIEMBRO_RESET,
  UPDATE_MIEMBRO_REQUEST,
  UPDATE_MIEMBRO_SUCCESS,
  UPDATE_MIEMBRO_FAIL,
  UPDATE_MIEMBRO_RESET,
  DELETE_MIEMBRO_REQUEST,
  DELETE_MIEMBRO_SUCCESS,
  DELETE_MIEMBRO_FAIL,
  DELETE_MIEMBRO_RESET,
  MIEMBRO_DETAILS_REQUEST,
  MIEMBRO_DETAILS_SUCCESS,
  MIEMBRO_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/miembroConstants";

export const miembrosReducer = (state = { miembros: [] }, action) => {
  switch (action.type) {
    case ADMIN_MIEMBROS_REQUEST:
      return {
        loading: true,
        miembros: [],
      };

    case ADMIN_MIEMBROS_SUCCESS:
      return {
        loading: false,
        miembros: action.payload,
      };

    case ADMIN_MIEMBROS_FAIL:
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

export const jugadoresReducer = (state = { jugadores: [] }, action) => {
  switch (action.type) {
    case GET_JUGADORES_REQUEST:
      return {
        loading: true,
        jugadores: [],
      };

    case GET_JUGADORES_SUCCESS:
      return {
        loading: false,
        jugadores: action.payload,
      };

    case GET_JUGADORES_FAIL:
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

export const cuerpoTecnicoReducer = (state = { cuerpoTecnico: [] }, action) => {
  switch (action.type) {
    case GET_CUERPO_TECNICO_REQUEST:
      return {
        loading: true,
        cuerpoTecnico: [],
      };

    case GET_CUERPO_TECNICO_SUCCESS:
      return {
        loading: false,
        cuerpoTecnico: action.payload,
      };

    case GET_CUERPO_TECNICO_FAIL:
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

export const cuerpoMedicoReducer = (state = { cuerpoMedico: [] }, action) => {
  switch (action.type) {
    case GET_CUERPO_MEDICO_REQUEST:
      return {
        loading: true,
        cuerpoMedico: [],
      };

    case GET_CUERPO_MEDICO_SUCCESS:
      return {
        loading: false,
        cuerpoMedico: action.payload,
      };

    case GET_CUERPO_MEDICO_FAIL:
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

export const miembroDetailsReducer = (state = { miembro: {} }, action) => {
  switch (action.type) {
    case MIEMBRO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MIEMBRO_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        miembro: action.payload,
      };

    case MIEMBRO_DETAILS_FAIL:
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

export const createMiembroReducer = (state = { miembro: {} }, action) => {
  switch (action.type) {
    case CREATE_MIEMBRO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_MIEMBRO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        miembro: action.payload.miembro,
      };

    case CREATE_MIEMBRO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_MIEMBRO_RESET:
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

export const miembroReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MIEMBRO_REQUEST:
    case UPDATE_MIEMBRO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_MIEMBRO_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_MIEMBRO_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_MIEMBRO_FAIL:
    case UPDATE_MIEMBRO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_MIEMBRO_RESET:
      return {
        ...state,
        esEliminado: false,
      };

    case UPDATE_MIEMBRO_RESET:
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
