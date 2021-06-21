const express = require("express");
const router = express.Router();

const {
  createClasificacion,
  getAdminClasificaciones,
  getSingleClasificacion,
  updateClasificacion,
  deleteClasificacion,
} = require("../controllers/clasificacionController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/clasificaciones").get(getAdminClasificaciones);
router.route("/clasificacion/:id").get(getSingleClasificacion);

router
  .route("/admin/clasificacion/nueva")
  .post(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    createClasificacion
  );

router
  .route("/admin/clasificacion/:id")
  .put(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    updateClasificacion
  )
  .delete(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    deleteClasificacion
  );

module.exports = router;
