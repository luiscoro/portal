const express = require("express");
const router = express.Router();

const {
    getAdminConfiguracion,
    updateConfiguracion
} = require("../controllers/configuracionController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/configuracion").get(getAdminConfiguracion);

router
    .route("/admin/configuracion")
    .put(authenticatedUsuario, authorizeRoles("administrador"), updateConfiguracion);

module.exports = router;
