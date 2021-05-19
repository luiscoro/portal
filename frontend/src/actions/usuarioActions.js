import axios from "axios";
import {
  CLEAR_ERRORS,
  DELETE_USUARIO_FAIL,
  DELETE_USUARIO_REQUEST,
  DELETE_USUARIO_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USUARIOS_FAIL,
  GET_USUARIOS_REQUEST,
  GET_USUARIOS_SUCCESS,
  LOAD_USUARIO_FAIL,
  LOAD_USUARIO_REQUEST,
  LOAD_USUARIO_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTRO_USUARIO_FAIL,
  REGISTRO_USUARIO_REQUEST,
  REGISTRO_USUARIO_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PERFIL_FAIL,
  UPDATE_PERFIL_REQUEST,
  UPDATE_PERFIL_SUCCESS,
  UPDATE_USUARIO_FAIL,
  UPDATE_USUARIO_REQUEST,
  UPDATE_USUARIO_SUCCESS,
  USUARIO_DETAILS_FAIL,
  USUARIO_DETAILS_REQUEST,
  USUARIO_DETAILS_SUCCESS,
} from "../constants/usuarioConstants";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.usuario,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Registrar un usuario
export const registro = (nombre, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTRO_USUARIO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/registro",
      { nombre, email, password },
      config
    );

    dispatch({
      type: REGISTRO_USUARIO_SUCCESS,
      payload: data.usuario,
    });
  } catch (error) {
    dispatch({
      type: REGISTRO_USUARIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Perfil usuario
export const loadUsuario = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USUARIO_REQUEST });

    const { data } = await axios.get("/api/perfil");

    dispatch({
      type: LOAD_USUARIO_SUCCESS,
      payload: data.usuario,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USUARIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Actualizar perfil
export const updatePerfil = (usuarioData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PERFIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/perfil/actualizar",
      usuarioData,
      config
    );

    dispatch({
      type: UPDATE_PERFIL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PERFIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Actualizar contraseña
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/password/actualizar",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Olvido contraseña
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/password/olvido", email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Restablecer contraseña
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Cerrar sesión
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Listar usuarios
export const getUsuarios = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USUARIOS_REQUEST });

    const { data } = await axios.get("/api/admin/usuarios");

    dispatch({
      type: GET_USUARIOS_SUCCESS,
      payload: data.usuarios,
    });
  } catch (error) {
    dispatch({
      type: GET_USUARIOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Actualizar usuario - ADMIN
export const updateUsuario = (id, usuarioData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USUARIO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/usuario/${id}`,
      usuarioData,
      config
    );

    dispatch({
      type: UPDATE_USUARIO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USUARIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Perfil Usuario - ADMIN
export const getUsuarioDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USUARIO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/admin/usuario/${id}`);

    dispatch({
      type: USUARIO_DETAILS_SUCCESS,
      payload: data.usuario,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Eliminar usuario - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USUARIO_REQUEST });

    const { data } = await axios.delete(`/api/admin/usuario/${id}`);

    dispatch({
      type: DELETE_USUARIO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USUARIO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Limpiar errores
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
