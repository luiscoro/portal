const express = require("express");
const router = express.Router();

const {
    createCalculo,
    getAdminCalculos
} = require("../controllers/calculoController");


router.route("/admin/calculos").get(getAdminCalculos);

router
    .route("/admin/calculo/nuevo")
    .post(
        createCalculo
    );


module.exports = router;