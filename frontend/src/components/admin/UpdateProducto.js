import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProducto,
  getProductoDetails,
  clearErrors,
} from "../../actions/productoActions";
import { UPDATE_PRODUCTO_RESET } from "../../constants/productoConstants";

var MySwal;

const UpdateProducto = ({ match, history }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState(0);
  const [marca, setMarca] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [oldImagenes, setOldImagenes] = useState([]);
  const [imagenesPreview, setImagenesPreview] = useState([]);

  const categorias = ["Camisetas", "Uniformes", "Calentadores", "Accesorios"];

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, producto } = useSelector((state) => state.productoDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.producto
  );

  const productoId = match.params.id;

  useEffect(() => {
    if (producto && producto._id !== productoId) {
      dispatch(getProductoDetails(productoId));
    } else {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setDescripcion(producto.descripcion);
      setCategoria(producto.categoria);
      setMarca(producto.marca);
      setStock(producto.stock);
      setOldImagenes(producto.imagenes);
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

    if (updateError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "warning",
        iconColor: "orange",
        title: updateError,
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

    if (esActualizado) {
      localStorage.setItem("actualizado", "1");
      history.push("/admin-productos");
      dispatch({ type: UPDATE_PRODUCTO_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    esActualizado,
    updateError,
    producto,
    productoId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("precio", precio);
    formData.set("descripcion", descripcion);
    formData.set("categoria", categoria);
    formData.set("stock", stock);
    formData.set("marca", marca);

    imagenes.forEach((imagen) => {
      formData.append("imagenes", imagen);
    });

    dispatch(updateProducto(producto._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagenesPreview([]);
    setImagenes([]);
    setOldImagenes([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagenesPreview((oldArray) => [...oldArray, reader.result]);
          setImagenes((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {" "}
      <MetaData title={"Actualizar producto"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              {" "}
              {/* login-section start */}
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar producto</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Precio</label>
                              <input
                                type="text"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Descripción</label>
                              <textarea
                                placeholder="Ingresa la descripción..."
                                value={descripcion}
                                rows={2}
                                onChange={(e) => setDescripcion(e.target.value)}
                              ></textarea>
                            </div>

                            <div className="frm-group">
                              <label>Categoría</label>
                              <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                              >
                                <option value="">
                                  Seleccione una categoría
                                </option>
                                {categorias.map((categoria) => (
                                  <option key={categoria} value={categoria}>
                                    {categoria}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="frm-group">
                              <label>Stock</label>
                              <input
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Marca</label>
                              <input
                                type="text"
                                placeholder="Ingresa la marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Imágenes</label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  onChange={onChange}
                                  multiple
                                  accept="image/*"
                                />
                                <label className="custom-file-label">
                                  Agregar imágenes
                                </label>
                              </div>

                              {oldImagenes &&
                                oldImagenes.map((img) => (
                                  <img
                                    key={img}
                                    src={img.url}
                                    alt={img.url}
                                    className="mt-3 mr-2"
                                    width="55"
                                    height="52"
                                  />
                                ))}

                              {imagenesPreview.map((img) => (
                                <img
                                  src={img}
                                  key={img}
                                  alt="Images Preview"
                                  className="mt-3 mr-2"
                                  width="55"
                                  height="52"
                                />
                              ))}
                            </div>
                            <div className="frm-group">
                              <input type="submit" value="Actualizar" />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* login-section end */}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProducto;
