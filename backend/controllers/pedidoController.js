const Pedido = require("../models/pedido");
const Producto = require("../models/producto");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

var d = new Date();
d.setHours(d.getHours() - 5);

exports.createPedido = catchAsyncErrors(async (req, res, next) => {
  const {
    itemsPedido,
    infoEnvio,
    precioItems,
    precioImpuesto,
    precioEnvio,
    precioTotal,
    infoPago,
    usuario,
  } = req.body;

  const pedido = await Pedido.create({
    itemsPedido,
    infoEnvio,
    precioItems,
    precioImpuesto,
    precioEnvio,
    precioTotal,
    infoPago,
    usuario,
    fechaPago: d,
  });

  pedido.itemsPedido.forEach(async (item) => {
    await updateStock(item.producto, item.cantidad);
  });

  res.status(200).json({
    success: true,
    pedido,
  });
});

async function updateStock(id, cantidad) {
  const producto = await Producto.findById(id);

  producto.stock = producto.stock - cantidad;

  await producto.save({ validateBeforeSave: false });
}

exports.getSinglePedido = catchAsyncErrors(async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.id).populate(
    "usuario",
    "nombre email cedula"
  );

  if (!pedido) {
    return next(new ErrorHandler("Pedido no encontrado con este id", 404));
  }

  res.status(200).json({
    success: true,
    pedido,
  });
});

exports.Pedidos = catchAsyncErrors(async (req, res, next) => {
  const pedidos = await Pedido.find({ usuario: req.usuario.id });

  res.status(200).json({
    success: true,
    pedidos,
  });
});

exports.getPedidos = catchAsyncErrors(async (req, res, next) => {
  const pedidos = await Pedido.find();
  const pedidosPendientes = await Pedido.find({
    estadoPedido: "pendiente de envío",
  }).count();
  const pedidosEnviados = await Pedido.find({
    estadoPedido: "enviado",
  }).count();
  const pedidosEntregados = await Pedido.find({
    estadoPedido: "entregado",
  }).count();

  let montoTotal = 0;

  pedidos.forEach((pedido) => {
    montoTotal += pedido.precioTotal;
  });

  res.status(200).json({
    success: true,
    montoTotal,
    pedidos,
    pedidosPendientes,
    pedidosEnviados,
    pedidosEntregados,
  });
});

exports.updatePedido = catchAsyncErrors(async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.id);

  if (pedido.estadoPedido === "entregado") {
    return next(new ErrorHandler("El pedido ya ha sido entregado", 400));
  }
  if (pedido.estadoPedido === "") {
    return next(new ErrorHandler("Seleccione un estado válido", 400));
  }

  (pedido.estadoPedido = req.body.estado), (pedido.fechaEntrega = d);

  await pedido.save();

  res.status(200).json({
    success: true,
  });
});

exports.deletePedido = catchAsyncErrors(async (req, res, next) => {
  const pedido = await Pedido.findById(req.params.id);

  if (!pedido) {
    return next(new ErrorHandler("Pedido no encontrado con este id", 404));
  }

  await pedido.remove();

  res.status(200).json({
    success: true,
  });
});
