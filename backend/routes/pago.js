const express = require("express");
const router = express.Router();

const { processPago, sendStripApi } = require("../controllers/pagoController");

const { isAuthenticatedUsuario } = require("../middlewares/auth");

router.route("/pago/proceso").post(isAuthenticatedUsuario, processPago);
router.route("/stripeapi").get(isAuthenticatedUsuario, sendStripApi);

module.exports = router;
