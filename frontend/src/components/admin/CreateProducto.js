import React, { useState, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createProducto, clearErrors } from "../../actions/productoActions";
import { getAdminCategorias } from "../../actions/categoriaActions";
import { CREATE_PRODUCTO_RESET } from "../../constants/productoConstants";

var MySwal;

const CreateProducto = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(1);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState(0);
  const [tallas, setTallas] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesPreview, setImagenesPreview] = useState([]);

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { error, success } = useSelector((state) => state.createProducto);
  const { loading, categorias } = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch1(getAdminCategorias());

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

    if (success) {
      history.push("/admin-productos");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El producto ha sido creado con ??xito",
        timer: 3000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      dispatch({ type: CREATE_PRODUCTO_RESET });
    }
  }, [dispatch, error, success, history, dispatch1]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("precio", precio);
    formData.set("descripcion", descripcion);
    formData.set("categoria", categoria);
    formData.set("stock", stock);
    tallas.forEach((talla) => {
      formData.append("tallas", talla);
    });

    imagenes.forEach((imagen) => {
      formData.append("imagenes", imagen);
    });

    dispatch(createProducto(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagenesPreview([]);
    setImagenes([]);

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
      <MetaData title={"Nuevo producto"} />
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
                          <h3 className="title">Nuevo producto</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Categor??a</label>
                              {loading ? (
                                <Loader />
                              ) : (
                                <select
                                  value={categoria}
                                  onChange={(e) => setCategoria(e.target.value)}
                                >
                                  <option value={""}>
                                    Seleccione la categor??a del producto
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
                                placeholder="Ingresa el nombre del producto"
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
                                min="1"
                                onChange={(e) => setPrecio(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Descripci??n</label>
                              <textarea
                                placeholder="Ingresa la descripci??n..."
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
                                min="0"
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
                              <label>Im??genes</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  onChange={onChange}
                                  multiple
                                  required
                                />
                                <label className="custom-file-label">
                                  Agregar im??genes
                                </label>
                              </div>

                              {imagenesPreview.map((img) => (
                                <img
                                  src={img}
                                  key={img}
                                  alt=""
                                  className="mt-3 mr-2"
                                  width="55"
                                  height="52"
                                />
                              ))}
                            </div>
                            <div className="frm-group">
                              <input type="submit" value="Crear" />
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

export default CreateProducto;
