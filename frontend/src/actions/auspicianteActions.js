import axios from "axios";
import {
  ADMIN_AUSPICIANTES_FAIL,
  ADMIN_AUSPICIANTES_REQUEST,
  ADMIN_AUSPICIANTES_SUCCESS,
  CREATE_AUSPICIANTE_REQUEST,
  CREATE_AUSPICIANTE_SUCCESS,
  CREATE_AUSPICIANTE_FAIL,
  UPDATE_AUSPICIANTE_REQUEST,
  UPDATE_AUSPICIANTE_SUCCESS,
  UPDATE_AUSPICIANTE_FAIL,
  DELETE_AUSPICIANTE_REQUEST,
  DELETE_AUSPICIANTE_SUCCESS,
  DELETE_AUSPICIANTE_FAIL,
  AUSPICIANTE_DETAILS_REQUEST,
  AUSPICIANTE_DETAILS_SUCCESS,
  AUSPICIANTE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/auspicianteConstants";

export const getAdminAuspiciantes = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_AUSPICIANTES_REQUEST });

    const { data } = await axios.get(`/api/admin/auspiciantes`);

    dispatch({
      type: ADMIN_AUSPICIANTES_SUCCESS,
      payload: data.auspiciantes,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_AUSPICIANTES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createAuspiciante = (auspicianteData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_AUSPICIANTE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/auspiciante/nuevo`,
      auspicianteData,
      config
    );

    dispatch({
      type: CREATE_AUSPICIANTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_AUSPICIANTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAuspicianteDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUSPICIANTE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/auspiciante/${id}`);

    dispatch({
      type: AUSPICIANTE_DETAILS_SUCCESS,
      payload: data.auspiciante,
    });
  } catch (error) {
    dispatch({
      type: AUSPICIANTE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteAuspiciante = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_AUSPICIANTE_REQUEST });

    const { data } = await axios.delete(`/api/admin/auspiciante/${id}`);

    dispatch({
      type: DELETE_AUSPICIANTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_AUSPICIANTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAuspiciante = (id, auspicianteData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AUSPICIANTE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/auspiciante/${id}`,
      auspicianteData,
      config
    );

    dispatch({
      type: UPDATE_AUSPICIANTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_AUSPICIANTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
