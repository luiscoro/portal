const express = require("express");
const router = express.Router();

const {
  createDirigente,
  getAdminDirigentes,
  getSingleDirigente,
  updateDirigente,
  deleteDirigente,
} = require("../controllers/dirigenteController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/dirigentes").get(getAdminDirigentes);

router.route("/dirigente/:id").get(getSingleDirigente);

router
  .route("/admin/dirigente/nuevo")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createDirigente);

router
  .route("/admin/dirigente/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateDirigente)
  .delete(
    authenticatedUsuario,
    authorizeRoles("administrador"),
    deleteDirigente
  );

module.exports = router;
