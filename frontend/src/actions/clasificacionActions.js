import axios from "axios";
import {
  ADMIN_CLASIFICACIONES_FAIL,
  ADMIN_CLASIFICACIONES_REQUEST,
  ADMIN_CLASIFICACIONES_SUCCESS,
  CREATE_CLASIFICACION_REQUEST,
  CREATE_CLASIFICACION_SUCCESS,
  CREATE_CLASIFICACION_FAIL,
  UPDATE_CLASIFICACION_REQUEST,
  UPDATE_CLASIFICACION_SUCCESS,
  UPDATE_CLASIFICACION_FAIL,
  DELETE_CLASIFICACION_REQUEST,
  DELETE_CLASIFICACION_SUCCESS,
  DELETE_CLASIFICACION_FAIL,
  CLASIFICACION_DETAILS_REQUEST,
  CLASIFICACION_DETAILS_SUCCESS,
  CLASIFICACION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/clasificacionConstants";

export const getAdminClasificaciones = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CLASIFICACIONES_REQUEST });

    const { data } = await axios.get(`/api/admin/clasificaciones`);

    dispatch({
      type: ADMIN_CLASIFICACIONES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CLASIFICACIONES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createClasificacion =
  (equipo, puntos, golDiferencia) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CLASIFICACION_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/admin/clasificacion/nueva`,
        { equipo, puntos, golDiferencia },
        config
      );

      dispatch({
        type: CREATE_CLASIFICACION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CLASIFICACION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getClasificacionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASIFICACION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/clasificacion/${id}`);

    dispatch({
      type: CLASIFICACION_DETAILS_SUCCESS,
      payload: data.clasificacion,
    });
  } catch (error) {
    dispatch({
      type: CLASIFICACION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteClasificacion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CLASIFICACION_REQUEST });

    const { data } = await axios.delete(`/api/admin/clasificacion/${id}`);

    dispatch({
      type: DELETE_CLASIFICACION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CLASIFICACION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateClasificacion =
  (id, clasificacionData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CLASIFICACION_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/admin/clasificacion/${id}`,
        clasificacionData,
        config
      );

      dispatch({
        type: UPDATE_CLASIFICACION_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CLASIFICACION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
