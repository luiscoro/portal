import axios from "axios";
import {
    ADMIN_CONFIGURACION_FAIL,
    ADMIN_CONFIGURACION_REQUEST,
    ADMIN_CONFIGURACION_SUCCESS,
    UPDATE_CONFIGURACION_REQUEST,
    UPDATE_CONFIGURACION_SUCCESS,
    UPDATE_CONFIGURACION_FAIL,
    CLEAR_ERRORS,
} from "../constants/configuracionConstants";

export const getAdminConfiguraciones = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CONFIGURACION_REQUEST });

        const { data } = await axios.get(`/api/admin/config`);

        dispatch({
            type: ADMIN_CONFIGURACION_SUCCESS,
            payload: data.configuracion,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CONFIGURACION_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateConfiguracion = (configuracionData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CONFIGURACION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/admin/config`,
            configuracionData,
            config
        );

        dispatch({
            type: UPDATE_CONFIGURACION_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CONFIGURACION_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
