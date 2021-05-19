import axios from "axios";
import {
  ADD_TO_CESTA,
  REMOVE_ITEM_CESTA,
  SAVE_INFO_ENVIO,
} from "../constants/cestaConstants";

export const addItemCesta = (id, cantidad) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/producto/${id}`);

  dispatch({
    type: ADD_TO_CESTA,
    payload: {
      producto: data.producto._id,
      nombre: data.producto.nombre,
      precio: data.producto.precio,
      imagen: data.producto.imagenes[0].url,
      stock: data.producto.stock,
      cantidad,
    },
  });

  localStorage.setItem(
    "itemsCesta",
    JSON.stringify(getState().cesta.itemsCesta)
  );
};

export const removeItemCesta = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CESTA,
    payload: id,
  });

  localStorage.setItem(
    "itemsCesta",
    JSON.stringify(getState().cesta.itemsCesta)
  );
};

export const saveInfoEnvio = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_INFO_ENVIO,
    payload: data,
  });

  localStorage.setItem("infoEnvio", JSON.stringify(data));
};
