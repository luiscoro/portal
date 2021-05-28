// import React, { useState, useEffect } from "react";
// import MetaData from "../section/MetaData";
// import Sidebar from "./Sidebar";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getNoticiaDetails,
//   updateNoticia,
//   clearErrors
// } from "../../actions/noticiaActions";
// import { UPDATE_NOTICIA_RESET } from "../../constants/noticiaConstants";

// const UpdateNoticia = ({ match, history }) => {
//   const [titulo, setTitulo] = useState("");
//   const [descripcion, setDescripcion] = useState("");
//   const [imagen, setImagen] = useState("");
//   const [oldImagen, setOldImagen] = useState("");
//   const [imagenPreview, setImagenPreview] = useState("");

//   const MySwal = withReactContent(Swal);
//   const dispatch = useDispatch();

//   const { error, noticia } = useSelector((state) => state.noticiaDetails);
//   const { error: updateError, esActualizado} = useSelector((state) => state.noticia);
  

//   const noticiaId = match.params.id;

//   useEffect(() => {
//     // console.log(noticia && noticia._id !== noticiaId);
//     if (noticia && noticia._id !== noticiaId) {
//       dispatch(getNoticiaDetails(noticiaId));
     
//     }   else{

//         setTitulo(noticia.titulo);
//         setDescripcion(noticia.descripcion);
//         setOldImagen(noticia.imagen);
//     }
    
//     if (error) {
//       MySwal.fire({
//         background: "#f5ede4",
//         toast: true,
//         showCloseButton: true,
//         icon: "warning",
//         iconColor: "orange",
//         title: error,
//         position: "bottom",
//         showConfirmButton: false,
//         timer: 5000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener("mouseover", Swal.stopTimer);
//           toast.addEventListener("mouseleave", Swal.resumeTimer);
//         },
//       });
//       dispatch(clearErrors());
//     }

//     if (updateError) {
//         //alert.error(updateError);
//         dispatch(clearErrors());
//       }

//     if (esActualizado) {

//       localStorage.setItem("actualizado", "1");
//     //   dispatch(getNoticiaDetails());
//       history.push("/admin-noticias");

//       dispatch({
//         type: UPDATE_NOTICIA_RESET,
//       });
//     }
//   }, [dispatch,   error,   history, esActualizado,  updateError,    noticia,   noticiaId,]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.set("titulo", titulo);
//     formData.set("descripcion", descripcion);
//     formData.append("imagen", imagen);

//     MySwal.fire({
//       background: "#f5ede4",
//       title: "¿Está seguro de actualizar los datos de la noticia?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Si",
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         MySwal.fire({
//           background: "#f5ede4",
//           title: "Los datos de la noticia han sido actualizados con éxito",
//           showConfirmButton: false,
//           showCloseButton: false,
//         });
//         dispatch(updateNoticia(formData));
//       }
//     });
//   };

//   const onChange = (e) => {

//     setImagenPreview("");
//     setImagen("");
//     setOldImagen("");

//     if (e.target.name === "imagen") {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagenPreview(reader.result);
//           setImagen(reader.result);
//         }
//       };

//       reader.readAsDataURL(e.target.files[0]);
//     } 
//   };


//   return (
//     <>
//       {" "}
//       <MetaData title={"Actualizar noticia"} />
//       <div className="row">
//         <div className="col-12 col-md-2">
//           <Sidebar />
//         </div>
//         <div className="dashboard">
//           <div className="col-12 col-md-10">
//             <>
//               {" "}
//               {/* login-section start */}
//               <section className="login-section pt-120 pb-120">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-lg-12">
//                       <div className="login-block text-center">
//                         <div className="login-block-inner">
//                           <h3 className="title">Actualizar noticia</h3>

//                           <form className="login-form" onSubmit={submitHandler} 
//                           encType="multipart/form-data"
//                           >
                          
//                             <div className="frm-group">
//                               <label>Titulo</label>
//                               <input
//                                 type="text"
//                                 placeholder="Ingresa el titulo "
//                                 value={titulo}
//                                 onChange={(e) => setTitulo(e.target.value)}
//                               />
//                             </div>
//                             <div className="frm-group">
//                               <label>Descripción</label>
//                               <textarea
//                                 name="descripcion"
//                                 placeholder="Ingresa la descripción..."
//                                 value={descripcion}
//                                 rows={2}
//                                 onChange={(e)=> setDescripcion(e.target.value)}
//                               ></textarea>
//                             </div>

//                             <div className="frm-group">
//                               <label>Imagen</label>

//                               <div className="custom-file">
//                                 <input
//                                   name="imagen"
//                                   type="file"
//                                   className="custom-file-input"
//                                   accept="image/*"
//                                   onChange={onChange}
//                                 //   required
//                                 />
//                                 <label className="custom-file-label">
//                                   Agregar imagen
//                                 </label>
//                               </div>


//                               {oldImagen &&
//                                   <img
//                                     src={oldImagen.url}
//                                     alt={oldImagen.url}
//                                     className="mt-3 mr-2"
//                                     width="55"
//                                     height="52"
//                                   />
//                                 }

//                               <img
//                                 //defaultValue={}
//                                 src={imagenPreview}
//                                 alt="Imagen"
//                                 className="mt-3 mr-2"
//                                 width="55"
//                                 height="52"
//                               />
//                             </div>

                            

//                             <div className="frm-group">
//                               <input type="submit" value="Actualizar" />
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//               {/* login-section end */}
//             </>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateNoticia;