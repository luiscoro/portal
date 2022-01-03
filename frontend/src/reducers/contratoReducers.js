import {
    ADMIN_CONTRATOS_REQUEST,
    ADMIN_CONTRATOS_SUCCESS,
    ADMIN_CONTRATOS_FAIL,
    CREATE_CONTRATO_REQUEST,
    CREATE_CONTRATO_SUCCESS,
    CREATE_CONTRATO_FAIL,
    CREATE_CONTRATO_RESET,
    UPDATE_CONTRATO_REQUEST,
    UPDATE_CONTRATO_SUCCESS,
    UPDATE_CONTRATO_FAIL,
    UPDATE_CONTRATO_RESET,
    DELETE_CONTRATO_REQUEST,
    DELETE_CONTRATO_SUCCESS,
    DELETE_CONTRATO_FAIL,
    DELETE_CONTRATO_RESET,
    CONTRATO_DETAILS_REQUEST,
    CONTRATO_DETAILS_SUCCESS,
    CONTRATO_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/contratoConstants";

export const contratosReducer = (state = { contratos: [] }, action) => {
    switch (action.type) {
        case ADMIN_CONTRATOS_REQUEST:
            return {
                loading: true,
                contratos: [],
            };

        case ADMIN_CONTRATOS_SUCCESS:
            return {
                loading: false,
                contratos: action.payload,
            };

        case ADMIN_CONTRATOS_FAIL:
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

export const contratoDetailsReducer = (state = { contrato: {} }, action) => {
    switch (action.type) {
        case CONTRATO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CONTRATO_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                contrato: action.payload,
            };

        case CONTRATO_DETAILS_FAIL:
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

export const createContratoReducer = (state = { contrato: {} }, action) => {
    switch (action.type) {
        case CREATE_CONTRATO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_CONTRATO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                contrato: action.payload.contrato,
            };

        case CREATE_CONTRATO_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case CREATE_CONTRATO_RESET:
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

export const contratoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CONTRATO_REQUEST:
        case UPDATE_CONTRATO_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_CONTRATO_SUCCESS:
            return {
                ...state,
                loading: false,
                esEliminado: action.payload,
            };

        case UPDATE_CONTRATO_SUCCESS:
            return {
                ...state,
                loading: false,
                esActualizado: action.payload,
            };

        case DELETE_CONTRATO_FAIL:
        case UPDATE_CONTRATO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_CONTRATO_RESET:
            return {
                ...state,
                esEliminado: false,
            };

        case UPDATE_CONTRATO_RESET:
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
