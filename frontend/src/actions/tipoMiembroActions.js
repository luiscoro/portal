import axios from "axios";
import {
    ADMIN_TIPOMIEMBROS_FAIL,
    ADMIN_TIPOMIEMBROS_REQUEST,
    ADMIN_TIPOMIEMBROS_SUCCESS,
    CREATE_TIPOMIEMBRO_REQUEST,
    CREATE_TIPOMIEMBRO_SUCCESS,
    CREATE_TIPOMIEMBRO_FAIL,
    UPDATE_TIPOMIEMBRO_REQUEST,
    UPDATE_TIPOMIEMBRO_SUCCESS,
    UPDATE_TIPOMIEMBRO_FAIL,
    DELETE_TIPOMIEMBRO_REQUEST,
    DELETE_TIPOMIEMBRO_SUCCESS,
    DELETE_TIPOMIEMBRO_FAIL,
    TIPOMIEMBRO_DETAILS_REQUEST,
    TIPOMIEMBRO_DETAILS_SUCCESS,
    TIPOMIEMBRO_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/tipoMiembroConstants";

export const getAdminTipoMiembros = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TIPOMIEMBROS_REQUEST });

        const { data } = await axios.get(`/api/admin/tipomiembros`);

        dispatch({
            type: ADMIN_TIPOMIEMBROS_SUCCESS,
            payload: data.tipoMiembros,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_TIPOMIEMBROS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const createTipoMiembro = (nombre) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_TIPOMIEMBRO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/admin/tipomiembro/nuevo`,
            { nombre },
            config
        );

        dispatch({
            type: CREATE_TIPOMIEMBRO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_TIPOMIEMBRO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getTipoMiembroDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TIPOMIEMBRO_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/tipomiembro/${id}`);

        dispatch({
            type: TIPOMIEMBRO_DETAILS_SUCCESS,
            payload: data.tipoMiembro,
        });
    } catch (error) {
        dispatch({
            type: TIPOMIEMBRO_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteTipoMiembro = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TIPOMIEMBRO_REQUEST });

        const { data } = await axios.delete(`/api/admin/tipomiembro/${id}`);

        dispatch({
            type: DELETE_TIPOMIEMBRO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_TIPOMIEMBRO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateTipoMiembro = (id, tipoMiembroData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TIPOMIEMBRO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/admin/tipomiembro/${id}`,
            tipoMiembroData,
            config
        );

        dispatch({
            type: UPDATE_TIPOMIEMBRO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_TIPOMIEMBRO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
