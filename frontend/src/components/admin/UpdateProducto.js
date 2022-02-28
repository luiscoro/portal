import React, { useState, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
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
import Loader from "../section/Loader";
import { getAdminCategorias } from "../../actions/categoriaActions";
import { UPDATE_PRODUCTO_RESET } from "../../constants/productoConstants";

var MySwal;
var tallp;
const UpdateProducto = ({ match, history }) => {
  tallp = JSON.parse(localStorage.getItem("tallas"));
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(1);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState(0);
  const [tallas, setTallas] = useState(tallp || []);
  const [estado, setEstado] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [oldImagenes, setOldImagenes] = useState([]);
  const [imagenesPreview, setImagenesPreview] = useState([]);

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { error, producto } = useSelector((state) => state.productoDetails);
  const { loading, categorias } = useSelector((state) => state.categorias);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.producto
  );

  const productoId = match.params.id;

  useEffect(() => {
    dispatch1(getAdminCategorias());
    if (producto && producto._id !== productoId) {
      dispatch(getProductoDetails(productoId));
    } else {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setDescripcion(producto.descripcion);
      setCategoria(producto.categoria);
      setStock(producto.stock);
      setEstado(producto.estado);
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
    dispatch1,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("precio", precio);
    formData.set("descripcion", descripcion);
    formData.set("categoria", categoria);
    formData.set("stock", stock);
    formData.set("estado", estado);

    if (tallas !== undefined) {
      tallas.forEach((talla) => {
        formData.append("tallas", talla);
      });
    }

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
                              <label>Categoría</label>
                              {loading ? (
                                <Loader />
                              ) : (
                                <select
                                  value={categoria}
                                  onChange={(e) => setCategoria(e.target.value)}
                                >
                                  <option>
                                    Seleccione la categoría del producto
                                  </option>
                                  {categorias.filter(cat => cat.estado === "activa").map(categoria => (
                                    <option
                                      key={categoria._id}
                                      value={categoria._id}
                                    >
                                      {categoria.nombre}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
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
                              <label>Precio ($)</label>
                              <input
                                type="number"
                                value={precio}
                                step="0.1"
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
                              <label>Cantidad existente</label>
                              <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Tallas</label>
                              <TagsInput
                                type="text"
                                value={tallas}
                                onChange={setTallas}
                                name="tallas"
                                placeHolder="Ingresa una talla"
                              />
                            </div>
                            <div className="frm-group">
                              <label>Estado</label>
                              <select
                                name="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                              >
                                <option value="activo">activo</option>
                                <option value="inactivo">inactivo</option>
                              </select>
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
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProducto;
