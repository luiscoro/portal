import {
  ADMIN_INFORMACION_REQUEST,
  ADMIN_INFORMACION_SUCCESS,
  ADMIN_INFORMACION_FAIL,
  CREATE_INFORMACION_REQUEST,
  CREATE_INFORMACION_SUCCESS,
  CREATE_INFORMACION_FAIL,
  CREATE_INFORMACION_RESET,
  UPDATE_INFORMACION_REQUEST,
  UPDATE_INFORMACION_SUCCESS,
  UPDATE_INFORMACION_FAIL,
  UPDATE_INFORMACION_RESET,
  INFORMACION_DETAILS_REQUEST,
  INFORMACION_DETAILS_SUCCESS,
  INFORMACION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/informacionConstants";

export const informacionReducer = (state = { informacion: [] }, action) => {
  switch (action.type) {
    case ADMIN_INFORMACION_REQUEST:
      return {
        loading: true,
        informacion: [],
      };

    case ADMIN_INFORMACION_SUCCESS:
      return {
        loading: false,
        informacion: action.payload,
      };

    case ADMIN_INFORMACION_FAIL:
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

export const informacionDetailsReducer = (
  state = { informacion: {} },
  action
) => {
  switch (action.type) {
    case INFORMACION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case INFORMACION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        informacion: action.payload,
      };

    case INFORMACION_DETAILS_FAIL:
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

export const createInformacionReducer = (
  state = { informacion: {} },
  action
) => {
  switch (action.type) {
    case CREATE_INFORMACION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_INFORMACION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        informacion: action.payload.informacion,
      };

    case CREATE_INFORMACION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_INFORMACION_RESET:
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

export const updateInformacionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INFORMACION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_INFORMACION_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case UPDATE_INFORMACION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_INFORMACION_RESET:
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
