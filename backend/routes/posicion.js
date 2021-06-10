const express = require("express");
const router = express.Router();

const {
  createPosicion,
  getAdminPosiciones,
  getSinglePosicion,
  updatePosicion,
  deletePosicion,
} = require("../controllers/posicionController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/posiciones").get(getAdminPosiciones);
router.route("/posicion/:id").get(getSinglePosicion);

router
  .route("/admin/posicion/nueva")
  .post(authenticatedUsuario, authorizeRoles("admin"), createPosicion);

router
  .route("/admin/posicion/:id")
  .put(authenticatedUsuario, authorizeRoles("admin"), updatePosicion)
  .delete(authenticatedUsuario, authorizeRoles("admin"), deletePosicion);

module.exports = router;
