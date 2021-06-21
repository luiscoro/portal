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

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/productos").get(getProductos);
router.route("/admin/productos").get(getAdminProductos);
router.route("/producto/:id").get(getSingleProducto);

router
  .route("/admin/producto/nuevo")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createProducto);

router
  .route("/admin/producto/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateProducto)
  .delete(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    deleteProducto
  );

router.route("/revision").put(authenticatedUsuario, createRevisionProducto);
router.route("/revisiones").get(authenticatedUsuario, getRevisionesProducto);
router.route("/revisiones").delete(authenticatedUsuario, deleteRevision);

module.exports = router;
