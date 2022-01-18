import {
    ADMIN_CONFIGURACION_REQUEST,
    ADMIN_CONFIGURACION_SUCCESS,
    ADMIN_CONFIGURACION_FAIL,
    UPDATE_CONFIGURACION_REQUEST,
    UPDATE_CONFIGURACION_SUCCESS,
    UPDATE_CONFIGURACION_FAIL,
    UPDATE_CONFIGURACION_RESET,
    CLEAR_ERRORS,
} from "../constants/configuracionConstants";

export const configuracionesReducer = (state = { configuracion: {} }, action) => {
    switch (action.type) {
        case ADMIN_CONFIGURACION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADMIN_CONFIGURACION_SUCCESS:
            return {
                ...state,
                loading: false,
                configuracion: action.payload,
            };

        case ADMIN_CONFIGURACION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const configuracionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CONFIGURACION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_CONFIGURACION_SUCCESS:
            return {
                ...state,
                loading: false,
                esActualizado: action.payload,
            };

        case UPDATE_CONFIGURACION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_CONFIGURACION_RESET:
            return {
                ...state,
                esActualizado: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
