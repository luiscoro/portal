import axios from "axios";

import {
  CLEAR_ERRORS,
  CREATE_PEDIDO_FAIL,
  CREATE_PEDIDO_REQUEST,
  CREATE_PEDIDO_SUCCESS,
  DELETE_PEDIDO_FAIL,
  DELETE_PEDIDO_REQUEST,
  DELETE_PEDIDO_SUCCESS,
  GET_PEDIDOS_FAIL,
  GET_PEDIDOS_REQUEST,
  GET_PEDIDOS_SUCCESS,
  GET_PEDIDOSMENSUAL_FAIL,
  GET_PEDIDOSMENSUAL_REQUEST,
  GET_PEDIDOSMENSUAL_SUCCESS,
  PEDIDOS_FAIL,
  PEDIDOS_REQUEST,
  PEDIDOS_SUCCESS,
  PEDIDO_DETAILS_FAIL,
  PEDIDO_DETAILS_REQUEST,
  PEDIDO_DETAILS_SUCCESS,
  UPDATE_PEDIDO_FAIL,
  UPDATE_PEDIDO_REQUEST,
  UPDATE_PEDIDO_SUCCESS,
} from "../constants/pedidoConstants";

export const createPedido = (pedido) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PEDIDO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/pedido/nuevo", pedido, config);

    dispatch({
      type: CREATE_PEDIDO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PEDIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPedidos = () => async (dispatch) => {
  try {
    dispatch({ type: PEDIDOS_REQUEST });

    const { data } = await axios.get("/api/pedidos");

    dispatch({
      type: PEDIDOS_SUCCESS,
      payload: data.pedidos,
    });
  } catch (error) {
    dispatch({
      type: PEDIDOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPedidosMensual = (anio) => async (dispatch) => {
  try {
    dispatch({ type: GET_PEDIDOSMENSUAL_REQUEST });

    const { data } = await axios.get(`/api/pedidos/mensual/${anio}`);

    dispatch({
      type: GET_PEDIDOSMENSUAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PEDIDOSMENSUAL_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getPedidoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PEDIDO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/pedido/${id}`);

    dispatch({
      type: PEDIDO_DETAILS_SUCCESS,
      payload: data.pedido,
    });
  } catch (error) {
    dispatch({
      type: PEDIDO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminPedidos = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PEDIDOS_REQUEST });

    const { data } = await axios.get(`/api/admin/pedidos`);

    dispatch({
      type: GET_PEDIDOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PEDIDOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePedido = (id, pedidoData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PEDIDO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/pedido/${id}`,
      pedidoData,
      config
    );

    dispatch({
      type: UPDATE_PEDIDO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PEDIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePedido = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PEDIDO_REQUEST });

    const { data } = await axios.delete(`/api/admin/pedido/${id}`);

    dispatch({
      type: DELETE_PEDIDO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PEDIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
