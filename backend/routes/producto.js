const express = require("express");
const router = express.Router();

const {
  getProductos,
  getAdminProductos,
  createProducto,
  getSingleProducto,
  updateProducto,
  deleteProducto,
  createRevisionProducto,
  getRevisionesProducto,
  deleteRevision,
} = require("../controllers/productoController");

const {
  isAuthenticatedUsuario,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/productos").get(getProductos);
router.route("/admin/productos").get(getAdminProductos);
router.route("/producto/:id").get(getSingleProducto);

router
  .route("/admin/producto/nuevo")
  .post(isAuthenticatedUsuario, authorizeRoles("admin"), createProducto);

router
  .route("/admin/producto/:id")
  .put(isAuthenticatedUsuario, authorizeRoles("admin"), updateProducto)
  .delete(isAuthenticatedUsuario, authorizeRoles("admin"), deleteProducto);

router.route("/revision").put(isAuthenticatedUsuario, createRevisionProducto);
router.route("/revisiones").get(isAuthenticatedUsuario, getRevisionesProducto);
router.route("/revisiones").delete(isAuthenticatedUsuario, deleteRevision);

module.exports = router;
