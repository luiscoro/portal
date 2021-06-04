import axios from "axios";
import {
  ADMIN_PARTIDOS_FAIL,
  ADMIN_PARTIDOS_REQUEST,
  ADMIN_PARTIDOS_SUCCESS,
  TOP_PARTIDO_REQUEST,
  TOP_PARTIDO_SUCCESS,
  TOP_PARTIDO_FAIL,
  NEXT_PARTIDOS_REQUEST,
  NEXT_PARTIDOS_SUCCESS,
  NEXT_PARTIDOS_FAIL,
  LAST_PARTIDOS_REQUEST,
  LAST_PARTIDOS_SUCCESS,
  LAST_PARTIDOS_FAIL,
  CREATE_PARTIDO_REQUEST,
  CREATE_PARTIDO_SUCCESS,
  CREATE_PARTIDO_FAIL,
  UPDATE_PARTIDO_REQUEST,
  UPDATE_PARTIDO_SUCCESS,
  UPDATE_PARTIDO_FAIL,
  DELETE_PARTIDO_REQUEST,
  DELETE_PARTIDO_SUCCESS,
  DELETE_PARTIDO_FAIL,
  PARTIDO_DETAILS_REQUEST,
  PARTIDO_DETAILS_SUCCESS,
  PARTIDO_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/partidoConstants";

export const getAdminPartidos = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PARTIDOS_REQUEST });

    const { data } = await axios.get(`/api/admin/partidos`);

    dispatch({
      type: ADMIN_PARTIDOS_SUCCESS,
      payload: data.partidos,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PARTIDOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPartidoTop = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PARTIDO_REQUEST });

    const { data } = await axios.get(`/api/partido/top`);

    dispatch({
      type: TOP_PARTIDO_SUCCESS,
      payload: data.partidos,
    });
  } catch (error) {
    dispatch({
      type: TOP_PARTIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPartidosLast = () => async (dispatch) => {
  try {
    dispatch({ type: LAST_PARTIDOS_REQUEST });

    const { data } = await axios.get(`/api/partidos/last`);

    dispatch({
      type: LAST_PARTIDOS_SUCCESS,
      payload: data.partidos,
    });
  } catch (error) {
    dispatch({
      type: LAST_PARTIDOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPartidosNext = () => async (dispatch) => {
  try {
    dispatch({ type: NEXT_PARTIDOS_REQUEST });

    const { data } = await axios.get(`/api/partido/next`);

    dispatch({
      type: NEXT_PARTIDOS_SUCCESS,
      payload: data.partidos,
    });
  } catch (error) {
    dispatch({
      type: NEXT_PARTIDOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createPartido = (partidoData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PARTIDO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/partido/nuevo`,
      partidoData,
      config
    );

    dispatch({
      type: CREATE_PARTIDO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PARTIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPartidoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PARTIDO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/partido/${id}`);

    dispatch({
      type: PARTIDO_DETAILS_SUCCESS,
      payload: data.partido,
    });
  } catch (error) {
    dispatch({
      type: PARTIDO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePartido = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PARTIDO_REQUEST });

    const { data } = await axios.delete(`/api/admin/partido/${id}`);

    dispatch({
      type: DELETE_PARTIDO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PARTIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePartido = (id, partidoData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PARTIDO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/partido/${id}`,
      partidoData,
      config
    );

    dispatch({
      type: UPDATE_PARTIDO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PARTIDO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
