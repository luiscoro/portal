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

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/pedido/nuevo").post(authenticatedUsuario, createPedido);

router.route("/pedido/:id").get(authenticatedUsuario, getSinglePedido);
router.route("/pedidos").get(authenticatedUsuario, Pedidos);

router
  .route("/admin/pedidos/")
  .get(authenticatedUsuario, authorizeRoles("admin"), getPedidos);
router
  .route("/admin/pedido/:id")
  .put(authenticatedUsuario, authorizeRoles("admin"), updatePedido)
  .delete(authenticatedUsuario, authorizeRoles("admin"), deletePedido);

module.exports = router;
