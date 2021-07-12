import React from 'react'
import MetaData from "./section/MetaData";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <MetaData title={"Página no encontrada"} />
            <section style={{ paddingBottom: "450px" }} className="inner-banner-section bg_img base-overlay">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="inner-banner-content text-center">
                                <h2 className="page-title">Página no encontrada</h2>
                                <ol className="breadcum d-flex justify-content-center">
                                    <li>
                                        <Link to="/" style={{ textDecoration: "none" }}>
                                            Inicio
                                        </Link>
                                    </li>
                                    <li>Página no encontrada</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error
