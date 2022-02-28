const mongoose = require("mongoose");

var d = new Date();
d.setHours(d.getHours() - 5);

const pedidoSchema = mongoose.Schema({
  infoEnvio: {
    ciudad: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    codigoPostal: {
      type: String,
      required: true,
    },
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  itemsPedido: [
    {
      nombre: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      talla: {
        type: String,
        required: false,
      },
      imagen: {
        type: String,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Producto",
      },
    },
  ],
  infoPago: {
    id: {
      type: String,
    },
    estado: {
      type: String,
    },
  },
  fechaPago: {
    type: Date,
  },

  precioItems: {
    type: Number,
    required: true,
    default: 0.0,
  },
  precioImpuesto: {
    type: Number,
    required: true,
    default: 0.0,
  },
  precioEnvio: {
    type: Number,
    required: true,
    default: 0.0,
  },
  precioTotal: {
    type: Number,
    required: true,
    default: 0.0,
  },
  estadoPedido: {
    type: String,
    required: true,
    default: "pendiente de envío",
  },
  fechaEntrega: {
    type: Date,
  },
  fechaCreacion: {
    type: Date,
    default: d,
  },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
