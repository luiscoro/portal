const express = require("express");
const router = express.Router();

const {
    createContrato,
    getAdminContratos,
    getSingleContrato,
    updateContrato,
    deleteContrato,
} = require("../controllers/contratoController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/contratos").get(getAdminContratos);
router.route("/contrato/:id").get(getSingleContrato);

router
    .route("/admin/contrato/nuevo")
    .post(authenticatedUsuario, authorizeRoles("administrador"), createContrato);

router
    .route("/admin/contrato/:id")
    .put(authenticatedUsuario, authorizeRoles("administrador"), updateContrato)
    .delete(
        authenticatedUsuario,
        authorizeRoles("administrador"),
        deleteContrato
    );

module.exports = router;
