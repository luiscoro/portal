import axios from "axios";
import {
  ADMIN_POSICIONES_FAIL,
  ADMIN_POSICIONES_REQUEST,
  ADMIN_POSICIONES_SUCCESS,
  CREATE_POSICION_REQUEST,
  CREATE_POSICION_SUCCESS,
  CREATE_POSICION_FAIL,
  UPDATE_POSICION_REQUEST,
  UPDATE_POSICION_SUCCESS,
  UPDATE_POSICION_FAIL,
  DELETE_POSICION_REQUEST,
  DELETE_POSICION_SUCCESS,
  DELETE_POSICION_FAIL,
  POSICION_DETAILS_REQUEST,
  POSICION_DETAILS_SUCCESS,
  POSICION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/posicionConstants";

export const getAdminPosiciones = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_POSICIONES_REQUEST });

    const { data } = await axios.get(`/api/admin/posiciones`);

    dispatch({
      type: ADMIN_POSICIONES_SUCCESS,
      payload: data.posiciones,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_POSICIONES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createPosicion = (nombre) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POSICION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/posicion/nueva`,
      { nombre },
      config
    );

    dispatch({
      type: CREATE_POSICION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_POSICION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPosicionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POSICION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/posicion/${id}`);

    dispatch({
      type: POSICION_DETAILS_SUCCESS,
      payload: data.posicion,
    });
  } catch (error) {
    dispatch({
      type: POSICION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePosicion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POSICION_REQUEST });

    const { data } = await axios.delete(`/api/admin/posicion/${id}`);

    dispatch({
      type: DELETE_POSICION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POSICION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePosicion = (id, posicionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POSICION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/posicion/${id}`,
      posicionData,
      config
    );

    dispatch({
      type: UPDATE_POSICION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POSICION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
