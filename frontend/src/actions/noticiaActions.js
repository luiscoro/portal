import axios from "axios";
import {
  CREATE_NOTICIA_REQUEST,
  CREATE_NOTICIA_SUCCESS,
  CREATE_NOTICIA_FAIL,
  CLEAR_ERRORS,
} from "../constants/noticiaConstants";

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

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
