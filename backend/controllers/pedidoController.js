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
  const pedidos = await Pedido.find().populate(
    "usuario",
    "nombre cedula email"
  );;


  let montoTotal = 0;
  let cantP;

  pedidos.forEach((pedido) => {
    montoTotal += pedido.precioTotal;
  });

  const pedidosPendientes = pedidos
    .filter(ped => ped.estadoPedido === "pendiente de envío");

  cantP = pedidosPendientes.length;


  res.status(200).json({
    success: true,
    montoTotal,
    cantP,
    pedidos,
  });
});

exports.getPedidoMensual = catchAsyncErrors(async (req, res, next) => {
  const pedidos = await Pedido.find();
  const anio = req.params.anio;

  let montoEnero = 0;
  let montoFebrero = 0;
  let montoMarzo = 0;
  let montoAbril = 0;
  let montoMayo = 0;
  let montoJunio = 0;
  let montoJulio = 0;
  let montoAgosto = 0;
  let montoSeptiembre = 0;
  let montoOctubre = 0;
  let montoNoviembre = 0;
  let montoDiciembre = 0;

  pedidos.forEach((pedido) => {
    var fecha = ((pedido.fechaPago).toString());
    var let1 = fecha.substring(11, 15);
    var let2 = fecha.substring(4, 7);
    var letra = let1 + let2;
    if (letra === anio + "Jan") {
      montoEnero += pedido.precioTotal;
    }
    if (letra === anio + "Feb") {
      montoFebrero += pedido.precioTotal;
    }
    if (letra === anio + "Mar") {
      montoMarzo += pedido.precioTotal;
    }
    if (letra === anio + "Apr") {
      montoAbril += pedido.precioTotal;
    }
    if (letra === anio + "May") {
      montoMayo += pedido.precioTotal;
    }
    if (letra === anio + "Jun") {
      montoJunio += pedido.precioTotal;
    }
    if (letra === anio + "Jul") {
      montoJulio += pedido.precioTotal;
    }
    if (letra === anio + "Aug") {
      montoAgosto += pedido.precioTotal;
    }
    if (letra === anio + "Sep") {
      montoSeptiembre += pedido.precioTotal;
    }
    if (letra === anio + "Oct") {
      montoOctubre += pedido.precioTotal;
    }
    if (letra === anio + "Nov") {
      montoNoviembre += pedido.precioTotal;
    }
    if (letra === anio + "Dec") {
      montoDiciembre += pedido.precioTotal;
    }


  });

  res.status(200).json({
    success: true,
    montoEnero,
    montoFebrero,
    montoMarzo,
    montoAbril,
    montoMayo,
    montoJunio,
    montoJulio,
    montoAgosto,
    montoSeptiembre,
    montoOctubre,
    montoNoviembre,
    montoDiciembre
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
    return next(new ErrorHandler("El pedido no ha sido encontrado", 400));
  }

  await pedido.remove();

  res.status(200).json({
    success: true,
  });
});
