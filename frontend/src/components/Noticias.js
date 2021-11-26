import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "./section/MetaData";
import Loader from "./section/Loader";
import Banner from "./section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Noticia from "./noticia/Noticia";
import SearchNoticia from "./section/SearchNoticia";
import { useDispatch, useSelector } from "react-redux";
import { getNoticias } from "../actions/noticiaActions";

var MySwal;

const Noticias = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const {
    loading,
    noticias,
    error,
    noticiasCount,
    resPerPage,
    filteredNoticiasCount,
  } = useSelector((state) => state.noticias);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return MySwal.fire({
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
    }
    dispatch(getNoticias(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = noticiasCount;
  if (keyword) {
    count = filteredNoticiasCount;
  }

  return (
    <>
      <MetaData title={"Noticias"} />
      <Banner title={"Noticias"} />

      <div className="d-flex justify-content-end">
        <Route render={({ history }) => <SearchNoticia history={history} />} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="blog-section pt-120 pb-120">
            <div className="container">
              <div className="row">

                {keyword ? (
                  <>
                    {filteredNoticiasCount === 0 ? (
                      <h5 className="title">No se encontró alguna noticia con el nombre ingresado</h5>
                    ) : (
                      noticias.map((noticia) => (
                        <Noticia key={noticia._id} noticia={noticia} col={6} />
                      )))}

                  </>
                ) : (
                  noticias.map((noticia) => (
                    <Noticia key={noticia._id} noticia={noticia} col={6} />
                  ))
                )}
              </div>
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={noticiasCount}
                onChange={setCurrentPageNo}
                nextPageText={"Siguiente"}
                prevPageText={"Anterior"}
                firstPageText={"Primera"}
                lastPageText={"Última"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Noticias;
