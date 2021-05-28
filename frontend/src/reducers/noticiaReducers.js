import {

  ADMIN_NOTICIAS_REQUEST,
  ADMIN_NOTICIAS_SUCCESS,
  ADMIN_NOTICIAS_FAIL,

  CREATE_NOTICIA_REQUEST,
  CREATE_NOTICIA_SUCCESS,
  CREATE_NOTICIA_FAIL,
  CREATE_NOTICIA_RESET,

  UPDATE_NOTICIA_REQUEST,
  UPDATE_NOTICIA_SUCCESS,
  UPDATE_NOTICIA_FAIL,
  UPDATE_NOTICIA_RESET,

  DELETE_NOTICIA_REQUEST,
  DELETE_NOTICIA_SUCCESS,
  DELETE_NOTICIA_FAIL,
  DELETE_NOTICIA_RESET,


NOTICIA_DETAILS_REQUEST,
  NOTICIA_DETAILS_SUCCESS,
  NOTICIA_DETAILS_FAIL,


  CLEAR_ERRORS,
} from "../constants/noticiaConstants";



export const noticiasReducer = (state = { noticias: [] }, action) => {
  switch (action.type) {
    // case GET_PRODUCTOS_REQUEST:
    case ADMIN_NOTICIAS_REQUEST:
      return {
        loading: true,
        noticias: [],
      };

    // case GET_NOTICIAS_SUCCESS:
    //   return {
    //     loading: false,
    //     productos: action.payload.productos,
    //     productosCount: action.payload.productosCount,
    //     resPerPage: action.payload.resPerPage,
    //     filteredProductosCount: action.payload.filteredProductosCount,
    //   };

    case ADMIN_NOTICIAS_SUCCESS:
      return {
        loading: false,
        noticias: action.payload,
      };

    // case GET_NOTICIAS_FAIL:
    case ADMIN_NOTICIAS_FAIL:
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


export const noticiaDetailsReducer = (state = { noticia: {} }, action) => {
  switch (action.type) {
    case NOTICIA_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NOTICIA_DETAILS_SUCCESS:
      return {
        loading: false,
        noticia: action.payload,
      };

    case NOTICIA_DETAILS_FAIL:
      return {
        ...state,
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



export const noticiaReducer = (state = {}, action) => {
  switch (action.type) {

      case DELETE_NOTICIA_REQUEST:
      case UPDATE_NOTICIA_REQUEST:
          return {
              ...state,
              loading: true
          }

      case DELETE_NOTICIA_SUCCESS:
          return {
              ...state,
              loading: false,
              esEliminado: action.payload
          }

      case UPDATE_NOTICIA_SUCCESS:
          return {
              ...state,
              loading: false,
              esActualizado: action.payload
          }


      case DELETE_NOTICIA_FAIL:
      case UPDATE_NOTICIA_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case DELETE_NOTICIA_RESET:
          return {
              ...state,
              esEliminado: false
          }

      case UPDATE_NOTICIA_RESET:
          return {
              ...state,
              esActualizado: false
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}
