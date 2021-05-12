const express = require("express");
const router = express.Router();

const {
  createNoticia,
  getNoticias,
  getAdminNoticias,
  getSingleNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticiaController");

const {
  isAuthenticatedUsuario,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/noticias").get(getNoticias);
router.route("/admin/noticias").get(getAdminNoticias);
router.route("/noticia/:id").get(getSingleNoticia);

router
  .route("/admin/noticia/nueva")
  .post(isAuthenticatedUsuario, authorizeRoles("admin"), createNoticia);

router
  .route("/admin/noticia/:id")
  .put(isAuthenticatedUsuario, authorizeRoles("admin"), updateNoticia)
  .delete(isAuthenticatedUsuario, authorizeRoles("admin"), deleteNoticia);

module.exports = router;
