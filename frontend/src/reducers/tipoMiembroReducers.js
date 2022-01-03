import {
    ADMIN_TIPOMIEMBROS_REQUEST,
    ADMIN_TIPOMIEMBROS_SUCCESS,
    ADMIN_TIPOMIEMBROS_FAIL,
    CREATE_TIPOMIEMBRO_REQUEST,
    CREATE_TIPOMIEMBRO_SUCCESS,
    CREATE_TIPOMIEMBRO_FAIL,
    CREATE_TIPOMIEMBRO_RESET,
    UPDATE_TIPOMIEMBRO_REQUEST,
    UPDATE_TIPOMIEMBRO_SUCCESS,
    UPDATE_TIPOMIEMBRO_FAIL,
    UPDATE_TIPOMIEMBRO_RESET,
    DELETE_TIPOMIEMBRO_REQUEST,
    DELETE_TIPOMIEMBRO_SUCCESS,
    DELETE_TIPOMIEMBRO_FAIL,
    DELETE_TIPOMIEMBRO_RESET,
    TIPOMIEMBRO_DETAILS_REQUEST,
    TIPOMIEMBRO_DETAILS_SUCCESS,
    TIPOMIEMBRO_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/tipoMiembroConstants";

export const tipoMiembrosReducer = (state = { tipoMiembros: [] }, action) => {
    switch (action.type) {
        case ADMIN_TIPOMIEMBROS_REQUEST:
            return {
                loading: true,
                tipoMiembros: [],
            };

        case ADMIN_TIPOMIEMBROS_SUCCESS:
            return {
                loading: false,
                tipoMiembros: action.payload,
            };

        case ADMIN_TIPOMIEMBROS_FAIL:
            return {
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

export const tipoMiembroDetailsReducer = (state = { tipoMiembro: {} }, action) => {
    switch (action.type) {
        case TIPOMIEMBRO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case TIPOMIEMBRO_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                tipoMiembro: action.payload,
            };

        case TIPOMIEMBRO_DETAILS_FAIL:
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

export const createTipoMiembroReducer = (state = { tipoMiembro: {} }, action) => {
    switch (action.type) {
        case CREATE_TIPOMIEMBRO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_TIPOMIEMBRO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                tipoMiembro: action.payload.tipoMiembro,
            };

        case CREATE_TIPOMIEMBRO_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case CREATE_TIPOMIEMBRO_RESET:
            return {
                ...state,
                success: false,
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

export const tipoMiembroReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TIPOMIEMBRO_REQUEST:
        case UPDATE_TIPOMIEMBRO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_TIPOMIEMBRO_SUCCESS:
            return {
                ...state,
                loading: false,
                esEliminado: action.payload,
            };

        case UPDATE_TIPOMIEMBRO_SUCCESS:
            return {
                ...state,
                loading: false,
                esActualizado: action.payload,
            };

        case DELETE_TIPOMIEMBRO_FAIL:
        case UPDATE_TIPOMIEMBRO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_TIPOMIEMBRO_RESET:
            return {
                ...state,
                esEliminado: false,
            };

        case UPDATE_TIPOMIEMBRO_RESET:
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
