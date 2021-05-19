import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Club Sport 3 de Julio`}</title>
    </Helmet>
  );
};

export default MetaData;
