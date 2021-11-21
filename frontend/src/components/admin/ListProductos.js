import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProductos,
  deleteProducto,
  clearErrors,
} from "../../actions/productoActions";
import { DELETE_PRODUCTO_RESET } from "../../constants/productoConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";

var MySwal;
var bandera;

const ListProductos = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, productos } = useSelector((state) => state.productos);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.producto
  );

  useEffect(() => {
    dispatch(getAdminProductos());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El producto ha sido actualizado con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    }

    if (error) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "warning",
        iconColor: "orange",
        title: error,
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      dispatch(clearErrors());
    }

    if (deleteError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "error",
        iconColor: "red",
        title: deleteError,
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      dispatch(clearErrors());
    }

    if (esEliminado) {
      history.push("/admin-productos");
      dispatch({ type: DELETE_PRODUCTO_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setProductos = () => {
    const data = {
      columns: [
        {
          label: "Categoría",
          field: "categoria",
          sort: "asc",
        },
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Precio",
          field: "precio",
          sort: "asc",
        },
        {
          label: "Descripción",
          field: "descripcion",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Marca",
          field: "marca",
          sort: "asc",
        },
        {
          label: "Foto",
          field: "foto",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    productos.forEach((producto) => {
      data.rows.push({
        categoria: producto.categoria && producto.categoria.nombre,
        nombre: producto.nombre,
        precio: `$${producto.precio}`,
        descripcion: producto.descripcion,
        stock: producto.stock,
        marca: producto.marca,
        foto: (
          <img
            alt=""
            src={producto.imagenes && producto.imagenes[0].url}
            width="55"
            height="52"
          />
        ),
        acciones: (
          <>
            <Link
              to={`/admin-producto/${producto._id}`}
              className="btn btn-primary py-1 px-2"
              title="Editar"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              title="Eliminar"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar el producto?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteProductoHandler(producto._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "El producto ha sido eliminado con éxito",
                      showConfirmButton: true,
                      confirmButtonColor: "#3085d6",
                      showCloseButton: false,
                      timer: 3000,
                    });
                  }
                });
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteProductoHandler = (id) => {
    dispatch(deleteProducto(id));
  };


  const exportPdf = () => {

    var img = new Image(10, 10);
    img.crossOrigin = "";
    img.src = "//i.imgur.com/qU9CtWQ.png";

    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Listado de productos";
    const headers = [["CATEGORÍA", "NOMBRE", "PRECIO", "DESCRIPCIÓN", "CANTIDAD EXISTENTE", "MARCA"]];

    const rows = [];

    productos.forEach(producto => {

      var temp = [producto.categoria && producto.categoria.nombre, producto.nombre, "$" + producto.precio, producto.descripcion, producto.stock, producto.marca];
      rows.push(temp);
    });


    let content = {
      startY: 80,
      head: headers,
      body: rows
    };

    doc.addImage(img, 275, 5);
    doc.text(title, 40, 70);
    doc.autoTable(content);
    doc.save("productos.pdf")
  }

  return (
    <>
      <MetaData title={"Listar productos"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <br />
              <Link
                to={`/admin-producto`}
                className="btn btn-primary btn-radius"
              >
                Crear nuevo
              </Link>
              <h3 className="my-4">Listado de productos</h3>
              <div className="botonpdf">
                <button
                  className="btn btn-danger py-1 px-2 ml-2"
                  onClick={() => {
                    exportPdf()
                  }}
                  title="Generar PDF"
                >

                  <i className="fa fa-file-pdf-o"></i>
                </button>
              </div>
              {loading ? (
                <Loader />
              ) : (

                <MDBDataTable
                  data={setProductos()}
                  className="px-3"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando registros"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                  noRecordsFoundLabel="No se encontró ningún registro"
                />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductos;
