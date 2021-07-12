const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/error");

// Configuración del entorno
if (process.env.NODE_ENV === "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Importación de las rutas para los servicios
const informacion = require("./routes/informacion");
const categoria = require("./routes/categoria");
const productos = require("./routes/producto");
const usuario = require("./routes/usuario");
const pago = require("./routes/pago");
const pedido = require("./routes/pedido");
const noticia = require("./routes/noticia");
const auspiciante = require("./routes/auspiciante");
const partido = require("./routes/partido");
const dirigente = require("./routes/dirigente");
const clasificacion = require("./routes/clasificacion");
const posicion = require("./routes/posicion");
const miembro = require("./routes/miembro");

app.use("/api", informacion);
app.use("/api", categoria);
app.use("/api", productos);
app.use("/api", usuario);
app.use("/api", pago);
app.use("/api", pedido);
app.use("/api", noticia);
app.use("/api", auspiciante);
app.use("/api", partido);
app.use("/api", dirigente);
app.use("/api", clasificacion);
app.use("/api", posicion);
app.use("/api", miembro);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Middleware para manejar los errores
app.use(errorMiddleware);

module.exports = app;
