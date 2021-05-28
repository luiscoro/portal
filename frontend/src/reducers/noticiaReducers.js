import {
  CREATE_NOTICIA_REQUEST,
  CREATE_NOTICIA_SUCCESS,
  CREATE_NOTICIA_FAIL,
  CREATE_NOTICIA_RESET,
  CLEAR_ERRORS,
} from "../constants/noticiaConstants";

export const createNoticiaReducer = (state = { noticia: {} }, action) => {
  switch (action.type) {
    case CREATE_NOTICIA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NOTICIA_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        noticia: action.payload.noticia,
      };

    case CREATE_NOTICIA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_NOTICIA_RESET:
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
