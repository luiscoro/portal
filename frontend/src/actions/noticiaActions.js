import axios from "axios";
import {
  ADMIN_NOTICIAS_FAIL,
  ADMIN_NOTICIAS_REQUEST,
  ADMIN_NOTICIAS_SUCCESS,
  CREATE_NOTICIA_REQUEST,
  CREATE_NOTICIA_SUCCESS,
  CREATE_NOTICIA_FAIL,
  UPDATE_NOTICIA_REQUEST,
  UPDATE_NOTICIA_SUCCESS,
  UPDATE_NOTICIA_FAIL,
  DELETE_NOTICIA_REQUEST,
  DELETE_NOTICIA_SUCCESS,
  DELETE_NOTICIA_FAIL,
  NOTICIA_DETAILS_REQUEST,
  NOTICIA_DETAILS_SUCCESS,
  NOTICIA_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/noticiaConstants";

export const getAdminNoticias = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_NOTICIAS_REQUEST });

    const { data } = await axios.get(`/api/admin/noticias`);

    dispatch({
      type: ADMIN_NOTICIAS_SUCCESS,
      payload: data.noticias,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_NOTICIAS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createNoticia = (noticiaData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NOTICIA_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/noticia/nueva`,
      noticiaData,
      config
    );

    dispatch({
      type: CREATE_NOTICIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTICIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getNoticiaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTICIA_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/noticia/${id}`);

    dispatch({
      type: NOTICIA_DETAILS_SUCCESS,
      payload: data.noticia,
    });
  } catch (error) {
    dispatch({
      type: NOTICIA_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteNoticia = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTICIA_REQUEST });

    const { data } = await axios.delete(`/api/admin/noticia/${id}`);

    dispatch({
      type: DELETE_NOTICIA_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTICIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateNoticia = (id, noticiaData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTICIA_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/noticia/${id}`,
      noticiaData,
      config
    );

    dispatch({
      type: UPDATE_NOTICIA_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NOTICIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
