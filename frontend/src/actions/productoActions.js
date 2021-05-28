import axios from "axios";

import {
  ADMIN_PRODUCTOS_FAIL,
  ADMIN_PRODUCTOS_REQUEST,
  ADMIN_PRODUCTOS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_PRODUCTO_FAIL,
  CREATE_PRODUCTO_REQUEST,
  CREATE_PRODUCTO_SUCCESS,
  CREATE_REVISION_FAIL,
  CREATE_REVISION_REQUEST,
  CREATE_REVISION_SUCCESS,
  DELETE_PRODUCTO_FAIL,
  DELETE_PRODUCTO_REQUEST,
  DELETE_PRODUCTO_SUCCESS,
  DELETE_REVISION_FAIL,
  DELETE_REVISION_REQUEST,
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
  UPDATE_PRODUCTO_SUCCESS,
} from "../constants/productoConstants";

export const getProductos =
  (keyword = "", currentPage = 1, precio, categoria, calificacion = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTOS_REQUEST });

      let link = `/api/productos?keyword=${keyword}&page=${currentPage}&precio[lte]=${precio[1]}&precio[gte]=${precio[0]}&calificaciones[gte]=${calificacion}`;

      if (categoria) {
        link = `/api/productos?keyword=${keyword}&page=${currentPage}&precio[lte]=${precio[1]}&precio[gte]=${precio[0]}&categoria=${categoria}&calificaciones[gte]=${calificacion}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: GET_PRODUCTOS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTOS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const createProducto = (productoData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCTO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/producto/nuevo`,
      productoData,
      config
    );

    dispatch({
      type: CREATE_PRODUCTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCTO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProducto = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTO_REQUEST });

    const { data } = await axios.delete(`/api/admin/producto/${id}`);

    dispatch({
      type: DELETE_PRODUCTO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProducto = (id, productoData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/producto/${id}`,
      productoData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCTO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/producto/${id}`);

    dispatch({
      type: PRODUCTO_DETAILS_SUCCESS,
      payload: data.producto,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createRevision = (revisionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVISION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/revision`, revisionData, config);

    dispatch({
      type: CREATE_REVISION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVISION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProductos = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTOS_REQUEST });

    const { data } = await axios.get(`/api/admin/productos`);

    dispatch({
      type: ADMIN_PRODUCTOS_SUCCESS,
      payload: data.productos,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductoRevisiones = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVISIONES_REQUEST });

    const { data } = await axios.get(`/api/revisiones?id=${id}`);

    dispatch({
      type: GET_REVISIONES_SUCCESS,
      payload: data.revisiones,
    });
  } catch (error) {
    dispatch({
      type: GET_REVISIONES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRevision = (id, productoId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVISION_REQUEST });

    const { data } = await axios.delete(
      `/api/revisiones?id=${id}&productoId=${productoId}`
    );

    dispatch({
      type: DELETE_REVISION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVISION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
