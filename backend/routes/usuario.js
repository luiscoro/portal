const express = require("express");
const router = express.Router();

const {
  createUsuario,
  loginUsuario,
  forgotPassword,
  resetPassword,
  getUsuarioProfile,
  updatePassword,
  updatePerfil,
  updateInfoEnvio,
  logout,
  getUsuarios,
  getUsuarioDetails,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarioController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/registro").post(createUsuario);
router.route("/login").post(loginUsuario);

router.route("/password/olvido").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/perfil").get(authenticatedUsuario, getUsuarioProfile);
router.route("/password/actualizar").put(authenticatedUsuario, updatePassword);
router.route("/perfil/actualizar").put(authenticatedUsuario, updatePerfil);
router.route("/perfil/eliminar").put(authenticatedUsuario, deleteUsuario);
router
  .route("/infoenvio/actualizar")
  .put(authenticatedUsuario, updateInfoEnvio);

router
  .route("/admin/usuarios")
  .get(authenticatedUsuario, authorizeRoles("administrador"), getUsuarios);
router
  .route("/admin/usuario/:id")
  .get(authenticatedUsuario, authorizeRoles("administrador"), getUsuarioDetails)
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateUsuario);

module.exports = router;
