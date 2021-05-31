import axios from "axios";
import {
  ADMIN_INFORMACION_FAIL,
  ADMIN_INFORMACION_REQUEST,
  ADMIN_INFORMACION_SUCCESS,
  CREATE_INFORMACION_REQUEST,
  CREATE_INFORMACION_SUCCESS,
  CREATE_INFORMACION_FAIL,
  UPDATE_INFORMACION_REQUEST,
  UPDATE_INFORMACION_SUCCESS,
  UPDATE_INFORMACION_FAIL,
  INFORMACION_DETAILS_REQUEST,
  INFORMACION_DETAILS_SUCCESS,
  INFORMACION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/informacionConstants";

export const getAdminInformacion = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INFORMACION_REQUEST });

    const { data } = await axios.get(`/api/admin/informacion`);

    dispatch({
      type: ADMIN_INFORMACION_SUCCESS,
      payload: data.informacion,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_INFORMACION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createInformacion = (informacionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INFORMACION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/informacion/nueva`,
      informacionData,
      config
    );

    dispatch({
      type: CREATE_INFORMACION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_INFORMACION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getInformacionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INFORMACION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/informacion/${id}`);

    dispatch({
      type: INFORMACION_DETAILS_SUCCESS,
      payload: data.informacion,
    });
  } catch (error) {
    dispatch({
      type: INFORMACION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateInformacion = (id, informacionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INFORMACION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/informacion/${id}`,
      informacionData,
      config
    );

    dispatch({
      type: UPDATE_INFORMACION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INFORMACION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
