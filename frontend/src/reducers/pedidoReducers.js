import {
  CLEAR_ERRORS,
  CREATE_PEDIDO_FAIL,
  CREATE_PEDIDO_REQUEST,
  CREATE_PEDIDO_SUCCESS,
  DELETE_PEDIDO_FAIL,
  DELETE_PEDIDO_REQUEST,
  DELETE_PEDIDO_RESET,
  DELETE_PEDIDO_SUCCESS,
  GET_PEDIDOS_FAIL,
  GET_PEDIDOS_REQUEST,
  GET_PEDIDOS_SUCCESS,
  PEDIDOS_FAIL,
  PEDIDOS_REQUEST,
  PEDIDOS_SUCCESS,
  PEDIDO_DETAILS_FAIL,
  PEDIDO_DETAILS_REQUEST,
  PEDIDO_DETAILS_SUCCESS,
  UPDATE_PEDIDO_FAIL,
  UPDATE_PEDIDO_REQUEST,
  UPDATE_PEDIDO_RESET,
  UPDATE_PEDIDO_SUCCESS,
} from "../constants/pedidoConstants";

export const createPedidoReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PEDIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PEDIDO_SUCCESS:
      return {
        loading: false,
        pedido: action.payload,
      };

    case CREATE_PEDIDO_FAIL:
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

export const pedidosReducer = (state = { pedidos: [] }, action) => {
  switch (action.type) {
    case PEDIDOS_REQUEST:
      return {
        loading: true,
      };

    case PEDIDOS_SUCCESS:
      return {
        loading: false,
        pedidos: action.payload,
      };

    case PEDIDOS_FAIL:
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

export const pedidoDetailsReducer = (state = { pedido: {} }, action) => {
  switch (action.type) {
    case PEDIDO_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case PEDIDO_DETAILS_SUCCESS:
      return {
        loading: false,
        pedido: action.payload,
      };

    case PEDIDO_DETAILS_FAIL:
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

export const getPedidosReducer = (state = { pedidos: [] }, action) => {
  switch (action.type) {
    case GET_PEDIDOS_REQUEST:
      return {
        loading: true,
      };

    case GET_PEDIDOS_SUCCESS:
      return {
        loading: false,
        pedidos: action.payload.pedidos,
        montoTotal: action.payload.montoTotal,
      };

    case GET_PEDIDOS_FAIL:
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

export const pedidoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PEDIDO_REQUEST:
    case DELETE_PEDIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        esActualizado: action.payload,
      };

    case DELETE_PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        esEliminado: action.payload,
      };

    case UPDATE_PEDIDO_FAIL:
    case DELETE_PEDIDO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PEDIDO_RESET:
      return {
        ...state,
        esActualizado: false,
      };

    case DELETE_PEDIDO_RESET:
      return {
        ...state,
        esEliminado: false,
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
