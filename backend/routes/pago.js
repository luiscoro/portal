const express = require("express");
const router = express.Router();

const { processPago, sendStripApi } = require("../controllers/pagoController");

const { authenticatedUsuario } = require("../middlewares/auth");

router.route("/pago/procesar").post(authenticatedUsuario, processPago);
router.route("/stripeapi").get(authenticatedUsuario, sendStripApi);

module.exports = router;
