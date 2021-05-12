const express = require("express");
const router = express.Router();

const {
  createPedido,
  getSinglePedido,
  Pedidos,
  getPedidos,
  updatePedido,
  deletePedido,
} = require("../controllers/pedidoController");

const {
  isAuthenticatedUsuario,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/pedido/nuevo").post(isAuthenticatedUsuario, createPedido);

router.route("/pedido/:id").get(isAuthenticatedUsuario, getSinglePedido);
router.route("/pedidos").get(isAuthenticatedUsuario, Pedidos);

router
  .route("/admin/pedidos/")
  .get(isAuthenticatedUsuario, authorizeRoles("admin"), getPedidos);
router
  .route("/admin/pedido/:id")
  .put(isAuthenticatedUsuario, authorizeRoles("admin"), updatePedido)
  .delete(isAuthenticatedUsuario, authorizeRoles("admin"), deletePedido);

module.exports = router;
