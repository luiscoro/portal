const app = require("./app");
const connectDb = require("./config/database");

const cloudinary = require("cloudinary");

// Control de excepciones
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Apagando el servidor por excepciones no controladas");
  process.exit(1);
});

// Configuración del entorno
if (process.env.NODE_ENV !== "DESARROLLO")
  require("dotenv").config({ path: "backend/config/config.env" });

// Conexión a la base de datos
connectDb();

// Configuración para el almacenamiento de imágenes
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Servidor escuchando en el puerto: ${process.env.PORT} en modo ${process.env.NODE_ENV}`
  );
});

// Control de promesas
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Apagando el servidor por promesas no controladas");
  server.close(() => {
    process.exit(1);
  });
});
