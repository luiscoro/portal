const express = require("express");
const router = express.Router();

const {
  createInformacion,
  getAdminInformacion,
  getSingleInformacion,
  updateInformacion,
} = require("../controllers/informacionController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/informacion").get(getAdminInformacion);
router.route("/informacion/:id").get(getSingleInformacion);

router
  .route("/admin/informacion/nueva")
  .post(authenticatedUsuario, authorizeRoles("admin"), createInformacion);

router
  .route("/admin/informacion/:id")
  .put(authenticatedUsuario, authorizeRoles("admin"), updateInformacion);

module.exports = router;
