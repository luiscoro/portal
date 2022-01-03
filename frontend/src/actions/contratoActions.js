import axios from "axios";
import {
    ADMIN_CONTRATOS_FAIL,
    ADMIN_CONTRATOS_REQUEST,
    ADMIN_CONTRATOS_SUCCESS,
    CREATE_CONTRATO_REQUEST,
    CREATE_CONTRATO_SUCCESS,
    CREATE_CONTRATO_FAIL,
    UPDATE_CONTRATO_REQUEST,
    UPDATE_CONTRATO_SUCCESS,
    UPDATE_CONTRATO_FAIL,
    DELETE_CONTRATO_REQUEST,
    DELETE_CONTRATO_SUCCESS,
    DELETE_CONTRATO_FAIL,
    CONTRATO_DETAILS_REQUEST,
    CONTRATO_DETAILS_SUCCESS,
    CONTRATO_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/contratoConstants";

export const getAdminContratos = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CONTRATOS_REQUEST });

        const { data } = await axios.get(`/api/admin/contratos`);

        dispatch({
            type: ADMIN_CONTRATOS_SUCCESS,
            payload: data.contratos,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CONTRATOS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const createContrato = (contratoData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTRATO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/admin/contrato/nuevo`,
            contratoData,
            config
        );

        dispatch({
            type: CREATE_CONTRATO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CONTRATO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getContratoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CONTRATO_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/contrato/${id}`);

        dispatch({
            type: CONTRATO_DETAILS_SUCCESS,
            payload: data.contrato,
        });
    } catch (error) {
        dispatch({
            type: CONTRATO_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteContrato = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTRATO_REQUEST });

        const { data } = await axios.delete(`/api/admin/contrato/${id}`);

        dispatch({
            type: DELETE_CONTRATO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CONTRATO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateContrato = (id, contratoData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CONTRATO_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `/api/admin/contrato/${id}`,
            contratoData,
            config
        );

        dispatch({
            type: UPDATE_CONTRATO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CONTRATO_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
