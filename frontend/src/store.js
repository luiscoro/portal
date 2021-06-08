import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  createInformacionReducer,
  informacionReducer,
  updateInformacionReducer,
  informacionDetailsReducer,
} from "./reducers/informacionReducers";

import {
  createCategoriaReducer,
  categoriaReducer,
  categoriasReducer,
  categoriaDetailsReducer,
} from "./reducers/categoriaReducers";

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
  createNoticiaReducer,
  noticiasReducer,
  noticiaReducer,
  noticiaDetailsReducer,
} from "./reducers/noticiaReducers";

import {
  createPartidoReducer,
  partidosReducer,
  partidoReducer,
  resultadosReducer,
  partidoDetailsReducer,
} from "./reducers/partidoReducers";

import {
  createAuspicianteReducer,
  auspiciantesReducer,
  auspicianteReducer,
  auspicianteDetailsReducer,
} from "./reducers/auspicianteReducers";

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
  pedidosReducer,
} from "./reducers/pedidoReducers";
import {
  createDirigenteReducer,
  dirigenteDetailsReducer,
  dirigenteReducer,
  dirigentesReducer,
} from "./reducers/dirigenteReducers";

const reducer = combineReducers({
  informacion: informacionReducer,
  informacionDetails: informacionDetailsReducer,
  createInformacion: createInformacionReducer,
  updateInformacion: updateInformacionReducer,
  categoriaDetails: categoriaDetailsReducer,
  categorias: categoriasReducer,
  productos: productosReducer,
  noticias: noticiasReducer,
  partidos: partidosReducer,
  resultados: resultadosReducer,
  auspiciantes: auspiciantesReducer,
  dirigentes: dirigentesReducer,
  productoDetails: productoDetailsReducer,
  noticiaDetails: noticiaDetailsReducer,
  partidoDetails: partidoDetailsReducer,
  auspicianteDetails: auspicianteDetailsReducer,
  dirigenteDetails: dirigenteDetailsReducer,
  createCategoria: createCategoriaReducer,
  createProducto: createProductoReducer,
  categoria: categoriaReducer,
  producto: productoReducer,
  noticia: noticiaReducer,
  partido: partidoReducer,
  auspiciante: auspicianteReducer,
  dirigente: dirigenteReducer,
  productoRevisiones: productoRevisionesReducer,
  revision: revisionReducer,
  auth: authReducer,
  usuario: usuarioReducer,
  getUsuarios: getUsuariosReducer,
  usuarioDetails: usuarioDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cesta: cestaReducer,
  createPedido: createPedidoReducer,
  pedidos: pedidosReducer,
  getPedidos: getPedidosReducer,
  pedidoDetails: pedidoDetailsReducer,
  pedido: pedidoReducer,
  createRevision: createRevisionReducer,
  createNoticia: createNoticiaReducer,
  createPartido: createPartidoReducer,
  createAuspiciante: createAuspicianteReducer,
  createDirigente: createDirigenteReducer,
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
