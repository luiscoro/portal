import axios from "axios";
import {
  ADMIN_MIEMBROS_FAIL,
  ADMIN_MIEMBROS_REQUEST,
  ADMIN_MIEMBROS_SUCCESS,
  GET_JUGADORES_REQUEST,
  GET_JUGADORES_SUCCESS,
  GET_JUGADORES_FAIL,
  GET_CUERPO_TECNICO_REQUEST,
  GET_CUERPO_TECNICO_SUCCESS,
  GET_CUERPO_TECNICO_FAIL,
  GET_CUERPO_MEDICO_REQUEST,
  GET_CUERPO_MEDICO_SUCCESS,
  GET_CUERPO_MEDICO_FAIL,
  CREATE_MIEMBRO_REQUEST,
  CREATE_MIEMBRO_SUCCESS,
  CREATE_MIEMBRO_FAIL,
  UPDATE_MIEMBRO_REQUEST,
  UPDATE_MIEMBRO_SUCCESS,
  UPDATE_MIEMBRO_FAIL,
  DELETE_MIEMBRO_REQUEST,
  DELETE_MIEMBRO_SUCCESS,
  DELETE_MIEMBRO_FAIL,
  MIEMBRO_DETAILS_REQUEST,
  MIEMBRO_DETAILS_SUCCESS,
  MIEMBRO_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/miembroConstants";

export const getAdminMiembros = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_MIEMBROS_REQUEST });

    const { data } = await axios.get(`/api/admin/miembros`);

    dispatch({
      type: ADMIN_MIEMBROS_SUCCESS,
      payload: data.miembros,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_MIEMBROS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getJugadores = () => async (dispatch) => {
  try {
    dispatch({ type: GET_JUGADORES_REQUEST });

    const { data } = await axios.get(`/api/miembros/jugadores`);

    dispatch({
      type: GET_JUGADORES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_JUGADORES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCuerpoTecnico = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CUERPO_TECNICO_REQUEST });

    const { data } = await axios.get(`/api/miembros/cuerpotecnico`);

    dispatch({
      type: GET_CUERPO_TECNICO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CUERPO_TECNICO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCuerpoMedico = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CUERPO_MEDICO_REQUEST });

    const { data } = await axios.get(`/api/miembros/cuerpomedico`);

    dispatch({
      type: GET_CUERPO_MEDICO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CUERPO_MEDICO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createMiembro = (miembroData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MIEMBRO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/miembro/nuevo`,
      miembroData,
      config
    );

    dispatch({
      type: CREATE_MIEMBRO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MIEMBRO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMiembroDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MIEMBRO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/miembro/${id}`);

    dispatch({
      type: MIEMBRO_DETAILS_SUCCESS,
      payload: data.miembro,
    });
  } catch (error) {
    dispatch({
      type: MIEMBRO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteMiembro = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MIEMBRO_REQUEST });

    const { data } = await axios.delete(`/api/admin/miembro/${id}`);

    dispatch({
      type: DELETE_MIEMBRO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MIEMBRO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateMiembro = (id, miembroData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MIEMBRO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/miembro/${id}`,
      miembroData,
      config
    );

    dispatch({
      type: UPDATE_MIEMBRO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MIEMBRO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
