import React, { useState, useEffect } from "react";
import { getCountries } from "country-list-spanish";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createMiembro, clearErrors } from "../../actions/miembroActions";
import { getAdminPosiciones } from "../../actions/posicionActions";
import { getAdminTipoMiembros } from "../../actions/tipoMiembroActions";
import { CREATE_MIEMBRO_RESET } from "../../constants/miembroConstants";

var MySwal;

const CreateMiembro = ({ history }) => {

  const listPaises = Object.values(getCountries());

  const [miembro, setMiembro] = useState({
    posicion: "",
    tipo: "",
    nombre: "",
    cedula: "",
    numeroCamiseta: "",
    fechaNacimiento: "",
    nacionalidad: "Ecuador",
  });

  const {
    posicion,
    tipo,
    nombre,
    cedula,
    numeroCamiseta,
    fechaNacimiento,
    nacionalidad,
  } = miembro;

  const [foto, setFoto] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();

  const { error, success } = useSelector((state) => state.createMiembro);
  const { posiciones } = useSelector((state) => state.posiciones);
  const { loading, tipoMiembros } = useSelector((state) => state.tipoMiembros);

  useEffect(() => {
    dispatch1(getAdminPosiciones());
    dispatch2(getAdminTipoMiembros());
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
      history.push("/admin-miembros");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El miembro ha sido creado con ??xito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_MIEMBRO_RESET });
    }
  }, [dispatch, error, success, history, dispatch1, dispatch2]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("posicion", posicion);
    formData.set("tipo", tipo);
    formData.set("nombre", nombre);
    formData.set("cedula", cedula);
    formData.set("numeroCamiseta", numeroCamiseta);
    formData.set("fechaNacimiento", fechaNacimiento);
    formData.set("nacionalidad", nacionalidad);
    formData.append("foto", foto);

    dispatch(createMiembro(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "foto") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFotoPreview(reader.result);
          setFoto(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setFotoPreview("");
        setFoto("");
      }
    } else {
      setMiembro({ ...miembro, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Nuevo miembro"} />
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
                          <h3 className="title">Nuevo miembro</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Tipo</label>
                              {loading ? (
                                <Loader />
                              ) : (
                                <select
                                  name="tipo"
                                  value={tipo}
                                  onChange={onChange}
                                >
                                  <option value={""}>
                                    Seleccione el tipo de miembro
                                  </option>
                                  {tipoMiembros.filter(tipoM => tipoM.estado === "activo").map(filtTipoM => (
                                    <option
                                      key={filtTipoM._id}
                                      value={filtTipoM._id}
                                    >
                                      {filtTipoM.nombre}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>

                            <div className="frm-group">
                              <label>Posici??n</label>
                              {tipo === "" ? (
                                <option value={""}>
                                  Seleccione primero el tipo de miembro
                                </option>
                              ) : (
                                <select
                                  name="posicion"
                                  value={posicion}
                                  onChange={onChange}
                                >
                                  <option value={""}>
                                    Seleccione la posici??n del miembro
                                  </option>
                                  {posiciones.filter(posicion => posicion.tipo === tipo && posicion.estado === "activa").map(filtposicion => (
                                    <option
                                      key={filtposicion._id}
                                      value={filtposicion._id}
                                    >
                                      {filtposicion.nombre}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>

                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                name="nombre"
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nombre}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Identificaci??n</label>
                              <input
                                name="cedula"
                                type="text"
                                placeholder="Ingresa la c??dula de identidad"
                                value={cedula}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">

                              <label>N??mero de camiseta</label>
                              <input
                                name="numeroCamiseta"
                                type="number"
                                placeholder="Ingresa el n??mero de camiseta"
                                value={numeroCamiseta}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Fecha de nacimiento</label>
                              <input
                                name="fechaNacimiento"
                                type="date"
                                value={fechaNacimiento}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Nacionalidad</label>

                              <select
                                name="nacionalidad"
                                value={nacionalidad}
                                onChange={onChange}
                              >
                                {listPaises.map((pais, i) => (
                                  <option key={i} value={pais}>
                                    {pais}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="frm-group">
                              <label>Foto</label>

                              <div className="custom-file">
                                <input
                                  name="foto"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Agregar foto
                                </label>
                              </div>

                              <img
                                src={fotoPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
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

export default CreateMiembro;
