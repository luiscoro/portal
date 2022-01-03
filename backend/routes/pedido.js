const express = require("express");
const router = express.Router();

const {
  createPedido,
  getSinglePedido,
  Pedidos,
  getPedidos,
  getPedidoMensual,
  updatePedido,
  deletePedido,
} = require("../controllers/pedidoController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/pedido/nuevo").post(authenticatedUsuario, createPedido);

router.route("/pedido/:id").get(authenticatedUsuario, getSinglePedido);
router.route("/pedidos").get(authenticatedUsuario, Pedidos);
router.route("/pedidos/mensual/:anio").get(authenticatedUsuario, getPedidoMensual);

router
  .route("/admin/pedidos/")
  .get(authenticatedUsuario, authorizeRoles("administrador"), getPedidos);
router
  .route("/admin/pedido/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updatePedido)
  .delete(authenticatedUsuario, authorizeRoles("administrador"), deletePedido);

module.exports = router;
