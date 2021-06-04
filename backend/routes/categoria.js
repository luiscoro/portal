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
  .post(authenticatedUsuario, authorizeRoles("admin"), createCategoria);

router
  .route("/admin/categoria/:id")
  .put(authenticatedUsuario, authorizeRoles("admin"), updateCategoria)
  .delete(authenticatedUsuario, authorizeRoles("admin"), deleteCategoria);

module.exports = router;
