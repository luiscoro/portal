const express = require("express");
const router = express.Router();

const {
  createMiembro,
  getAdminMiembros,
  getCuerpoTecnico,
  getCuerpoMedico,
  getJugadores,
  getSingleMiembro,
  updateMiembro,
  deleteMiembro,
} = require("../controllers/miembroController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/miembros/cuerpotecnico").get(getCuerpoTecnico);
router.route("/miembros/cuerpomedico").get(getCuerpoMedico);
router.route("/miembros/jugadores").get(getJugadores);
router.route("/admin/miembros").get(getAdminMiembros);
router.route("/miembro/:id").get(getSingleMiembro);

router
  .route("/admin/miembro/nuevo")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createMiembro);

router
  .route("/admin/miembro/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateMiembro)
  .delete(authenticatedUsuario, authorizeRoles("administrador"), deleteMiembro);

module.exports = router;
