import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  createProductoReducer,
  createRevisionReducer,
  productoDetailsReducer,
  productoReducer,
  productoRevisionesReducer,
  productosReducer,
  revisionReducer,
} from "./reducers/productoReducers";
import {
  authReducer,
  forgotPasswordReducer,
  getUsuariosReducer,
  usuarioDetailsReducer,
  usuarioReducer,
} from "./reducers/usuarioReducers";
import { cestaReducer } from "./reducers/cestaReducers";
import {
  createPedidoReducer,
  getPedidosReducer,
  pedidoDetailsReducer,
  pedidoReducer,
  PedidosReducer,
} from "./reducers/pedidoReducers";

const reducer = combineReducers({
  productos: productosReducer,
  productoDetails: productoDetailsReducer,
  createProducto: createProductoReducer,
  producto: productoReducer,
  productoRevisiones: productoRevisionesReducer,
  revision: revisionReducer,
  auth: authReducer,
  usuario: usuarioReducer,
  getUsuarios: getUsuariosReducer,
  usuarioDetails: usuarioDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cesta: cestaReducer,
  createPedido: createPedidoReducer,
  pedidos: PedidosReducer,
  getPedidos: getPedidosReducer,
  pedidoDetails: pedidoDetailsReducer,
  pedido: pedidoReducer,
  createRevision: createRevisionReducer,
});

let estadoInicial = {
  cesta: {
    itemsCesta: localStorage.getItem("itemsCesta")
      ? JSON.parse(localStorage.getItem("itemsCesta"))
      : [],
    infoEnvio: localStorage.getItem("infoEnvio")
      ? JSON.parse(localStorage.getItem("infoEnvio"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  estadoInicial,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
