import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createUsuario, clearErrors } from "../../actions/usuarioActions";
import { CREATE_USUARIO_RESET } from "../../constants/usuarioConstants";

const CreateProducto = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState("");

//   const categorias = ["Camisetas", "Uniformes", "Calentadores", "Accesorios"];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createUsuario);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin-usuarios");
      alert.success("El usuario ha sido creado con éxito");
      dispatch({ type: CREATE_USUARIO_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("password", password);

    dispatch(createUsuario(formData));
  };

//   const onChange = (e) => {
//     const files = Array.from(e.target.files);

    // files.forEach((file) => {
    //   const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagenesPreview((oldArray) => [...oldArray, reader.result]);
//           setImagenes((oldArray) => [...oldArray, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

  return (
    <>
      {" "}
      <MetaData title={"Nuevo usuario"} />
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
                          <h3 className="title">Nuevo usuario</h3>
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
                              <label>Correo electrónico</label>
                              <input
                                type="text"
                                placeholder="Ingresa el email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Password</label>
                              <textarea
                                placeholder="Ingresa la contraseña..."
                                value={password}
                                rows={2}
                                onChange={(e) => setPassword(e.target.value)}
                              ></textarea>
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
              {/* login-section end */}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProducto;
