const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(`Base de datos MongoDB conectada a: ${con.connection.host}`);
    });
};

module.exports = connectDb;
