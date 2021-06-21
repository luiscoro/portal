const express = require("express");
const router = express.Router();

const {
  createNoticia,
  getNoticias,
  getAdminNoticias,
  getNoticiasTop,
  getSingleNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticiaController");

const { authenticatedUsuario, authorizeRoles } = require("../middlewares/auth");

router.route("/noticias").get(getNoticias);
router.route("/admin/noticias").get(getAdminNoticias);
router.route("/noticias/top").get(getNoticiasTop);
router.route("/noticia/:id").get(getSingleNoticia);

router
  .route("/admin/noticia/nueva")
  .post(authenticatedUsuario, authorizeRoles("administrador"), createNoticia);

router
  .route("/admin/noticia/:id")
  .put(authenticatedUsuario, authorizeRoles("administrador"), updateNoticia)
  .delete(authenticatedUsuario, authorizeRoles("administrador"), deleteNoticia);

module.exports = router;
