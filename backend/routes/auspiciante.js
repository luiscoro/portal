const express = require("express");
const router = express.Router();

const {
  createAuspiciante,
  getAdminAuspiciantes,
  getSingleAuspiciante,
  updateAuspiciante,
  deleteAuspiciante,
} = require("../controllers/auspicianteController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/auspiciantes").get(getAdminAuspiciantes);
router.route("/auspiciante/:id").get(getSingleAuspiciante);

router
  .route("/admin/auspiciante/nuevo")
  .post(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    createAuspiciante
  );

router
  .route("/admin/auspiciante/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateAuspiciante)
  .delete(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    deleteAuspiciante
  );

module.exports = router;
