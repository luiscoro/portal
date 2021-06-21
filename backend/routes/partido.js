const express = require("express");
const router = express.Router();

const {
  createPartido,
  getAdminPartidos,
  getPartidoTop,
  getPartidosLast,
  getPartidosNext,
  getSinglePartido,
  updatePartido,
  deletePartido,
} = require("../controllers/partidoController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/partidos").get(getAdminPartidos);
router.route("/partido/top").get(getPartidoTop);
router.route("/partido/:id").get(getSinglePartido);
router.route("/partidos/last").get(getPartidosLast);
router.route("/partidos/next").get(getPartidosNext);

router
  .route("/admin/partido/nuevo")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createPartido);

router
  .route("/admin/partido/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updatePartido)
  .delete(authenticatedUsuario, authorizeRoles("administrador"), deletePartido);

module.exports = router;
