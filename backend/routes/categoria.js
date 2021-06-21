const express = require("express");
const router = express.Router();

const {
  createCategoria,
  getAdminCategorias,
  getSingleCategoria,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/categoriaController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/categorias").get(getAdminCategorias);
router.route("/categoria/:id").get(getSingleCategoria);

router
  .route("/admin/categoria/nueva")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createCategoria);

router
  .route("/admin/categoria/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateCategoria)
  .delete(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    deleteCategoria
  );

module.exports = router;
