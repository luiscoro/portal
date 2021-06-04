import axios from "axios";
import {
  ADMIN_CATEGORIAS_FAIL,
  ADMIN_CATEGORIAS_REQUEST,
  ADMIN_CATEGORIAS_SUCCESS,
  CREATE_CATEGORIA_REQUEST,
  CREATE_CATEGORIA_SUCCESS,
  CREATE_CATEGORIA_FAIL,
  UPDATE_CATEGORIA_REQUEST,
  UPDATE_CATEGORIA_SUCCESS,
  UPDATE_CATEGORIA_FAIL,
  DELETE_CATEGORIA_REQUEST,
  DELETE_CATEGORIA_SUCCESS,
  DELETE_CATEGORIA_FAIL,
  CATEGORIA_DETAILS_REQUEST,
  CATEGORIA_DETAILS_SUCCESS,
  CATEGORIA_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoriaConstants";

export const getAdminCategorias = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CATEGORIAS_REQUEST });

    const { data } = await axios.get(`/api/admin/categorias`);

    dispatch({
      type: ADMIN_CATEGORIAS_SUCCESS,
      payload: data.categorias,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CATEGORIAS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createCategoria = (nombre) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORIA_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/categoria/nueva`,
      { nombre },
      config
    );

    dispatch({
      type: CREATE_CATEGORIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategoriaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIA_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/categoria/${id}`);

    dispatch({
      type: CATEGORIA_DETAILS_SUCCESS,
      payload: data.categoria,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIA_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategoria = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORIA_REQUEST });

    const { data } = await axios.delete(`/api/admin/categoria/${id}`);

    dispatch({
      type: DELETE_CATEGORIA_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategoria = (id, categoriaData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORIA_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/categoria/${id}`,
      categoriaData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORIA_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
