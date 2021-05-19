import {
  ADMIN_PRODUCTOS_FAIL,
  ADMIN_PRODUCTOS_REQUEST,
  ADMIN_PRODUCTOS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_PRODUCTO_FAIL,
  CREATE_PRODUCTO_REQUEST,
  CREATE_PRODUCTO_RESET,
  CREATE_PRODUCTO_SUCCESS,
  CREATE_REVISION_FAIL,
  CREATE_REVISION_REQUEST,
  CREATE_REVISION_RESET,
  CREATE_REVISION_SUCCESS,
  DELETE_PRODUCTO_FAIL,
  DELETE_PRODUCTO_REQUEST,
  DELETE_PRODUCTO_RESET,
  DELETE_PRODUCTO_SUCCESS,
  DELETE_REVISION_FAIL,
  DELETE_REVISION_REQUEST,
  DELETE_REVISION_RESET,
  DELETE_REVISION_SUCCESS,
  GET_PRODUCTOS_FAIL,
  GET_PRODUCTOS_REQUEST,
  GET_PRODUCTOS_SUCCESS,
  GET_REVISIONES_FAIL,
  GET_REVISIONES_REQUEST,
  GET_REVISIONES_SUCCESS,
  PRODUCTO_DETAILS_FAIL,
  PRODUCTO_DETAILS_REQUEST,
  PRODUCTO_DETAILS_SUCCESS,
  UPDATE_PRODUCTO_FAIL,
  UPDATE_PRODUCTO_REQUEST,
  UPDATE_PRODUCTO_RESET,
  UPDATE_PRODUCTO_SUCCESS,
} from "../constants/productoConstants";

export const productosReducer = (state = { productos: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTOS_REQUEST:
    case ADMIN_PRODUCTOS_REQUEST:
      return {
        loading: true,
        productos: [],
      };

    case GET_PRODUCTOS_SUCCESS:
      return {
        loading: false,
        productos: action.payload.productos,
        productosCount: action.payload.productosCount,
        resPerPage: action.payload.resPerPage,
        filteredProductosCount: action.payload.filteredProductosCount,
      };

    case ADMIN_PRODUCTOS_SUCCESS:
      return {
        loading: false,
        productos: action.payload,
      };

    case GET_PRODUCTOS_FAIL:
    case ADMIN_PRODUCTOS_FAIL:
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

export const createProductoReducer = (state = { producto: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCTO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCTO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        producto: action.payload.producto,
      };

    case CREATE_PRODUCTO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_PRODUCTO_RESET:
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

export const productoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCTO_REQUEST:
    case UPDATE_PRODUCTO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCTO_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCTO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCTO_FAIL:
    case UPDATE_PRODUCTO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PRODUCTO_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PRODUCTO_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const productoDetailsReducer = (state = { producto: {} }, action) => {
  switch (action.type) {
    case PRODUCTO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCTO_DETAILS_SUCCESS:
      return {
        loading: false,
        producto: action.payload,
      };

    case PRODUCTO_DETAILS_FAIL:
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

export const createRevisionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVISION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_REVISION_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case CREATE_REVISION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_REVISION_RESET:
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

export const productoRevisionesReducer = (state = { revision: [] }, action) => {
  switch (action.type) {
    case GET_REVISIONES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REVISIONES_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVISIONES_FAIL:
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

export const revisionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVISION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVISION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVISION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVISION_RESET:
      return {
        ...state,
        isDeleted: false,
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
