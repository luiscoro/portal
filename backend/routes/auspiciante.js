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
  .post(authenticatedUsuario, authorizeRoles("admin"), createAuspiciante);

router
  .route("/admin/auspiciante/:id")
  .put(authenticatedUsuario, authorizeRoles("admin"), updateAuspiciante)
  .delete(authenticatedUsuario, authorizeRoles("admin"), deleteAuspiciante);

module.exports = router;
