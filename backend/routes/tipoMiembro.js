const express = require("express");
const router = express.Router();

const {
    createTipoMiembro,
    getAdminTipoMiembros,
    getSingleTipoMiembro,
    updateTipoMiembro,
    deleteTipoMiembro,
} = require("../controllers/tipoMiembroController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/tipomiembros").get(getAdminTipoMiembros);
router.route("/tipomiembro/:id").get(getSingleTipoMiembro);

router
    .route("/admin/tipomiembro/nuevo")
    .post(authenticatedUsuario, authorizeRoles("administrador"), createTipoMiembro);

router
    .route("/admin/tipomiembro/:id")
    .put(authenticatedUsuario, authorizeRoles("administrador"), updateTipoMiembro)
    .delete(
        authenticatedUsuario,
        authorizeRoles("administrador"),
        deleteTipoMiembro
    );

module.exports = router;
