const express = require("express");
const router = express.Router();

const {
  createUsuario,
  loginUsuario,
  forgotPassword,
  resetPassword,
  getUsuarioProfile,
  updatePassword,
  updateProfile,
  logout,
  getUsuarios,
  getUsuarioDetails,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarioController");

const {
  isAuthenticatedUsuario,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/registro").post(createUsuario);
router.route("/login").post(loginUsuario);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/perfil").get(isAuthenticatedUsuario, getUsuarioProfile);
router.route("/password/update").put(isAuthenticatedUsuario, updatePassword);
router.route("/perfil/update").put(isAuthenticatedUsuario, updateProfile);

router
  .route("/admin/usuarios")
  .get(isAuthenticatedUsuario, authorizeRoles("admin"), getUsuarios);
router
  .route("/admin/usuario/:id")
  .get(isAuthenticatedUsuario, authorizeRoles("admin"), getUsuarioDetails)
  .put(isAuthenticatedUsuario, authorizeRoles("admin"), updateUsuario)
  .delete(isAuthenticatedUsuario, authorizeRoles("admin"), deleteUsuario);

module.exports = router;
