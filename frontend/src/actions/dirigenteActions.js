import axios from "axios";
import {
  ADMIN_DIRIGENTES_FAIL,
  ADMIN_DIRIGENTES_REQUEST,
  ADMIN_DIRIGENTES_SUCCESS,
  CREATE_DIRIGENTE_REQUEST,
  CREATE_DIRIGENTE_SUCCESS,
  CREATE_DIRIGENTE_FAIL,
  UPDATE_DIRIGENTE_REQUEST,
  UPDATE_DIRIGENTE_SUCCESS,
  UPDATE_DIRIGENTE_FAIL,
  DELETE_DIRIGENTE_REQUEST,
  DELETE_DIRIGENTE_SUCCESS,
  DELETE_DIRIGENTE_FAIL,
  DIRIGENTE_DETAILS_REQUEST,
  DIRIGENTE_DETAILS_SUCCESS,
  DIRIGENTE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/dirigenteConstants";

export const getAdminDirigentes = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DIRIGENTES_REQUEST });

    const { data } = await axios.get(`/api/admin/dirigentes`);

    dispatch({
      type: ADMIN_DIRIGENTES_SUCCESS,
      payload: data.dirigentes,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DIRIGENTES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createDirigente = (dirigenteData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DIRIGENTE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/dirigente/nuevo`,
      dirigenteData,
      config
    );

    dispatch({
      type: CREATE_DIRIGENTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_DIRIGENTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDirigenteDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DIRIGENTE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/dirigente/${id}`);

    dispatch({
      type: DIRIGENTE_DETAILS_SUCCESS,
      payload: data.dirigente,
    });
  } catch (error) {
    dispatch({
      type: DIRIGENTE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteDirigente = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DIRIGENTE_REQUEST });

    const { data } = await axios.delete(`/api/admin/dirigente/${id}`);

    dispatch({
      type: DELETE_DIRIGENTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DIRIGENTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateDirigente = (id, dirigenteData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DIRIGENTE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/dirigente/${id}`,
      dirigenteData,
      config
    );

    dispatch({
      type: UPDATE_DIRIGENTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DIRIGENTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
