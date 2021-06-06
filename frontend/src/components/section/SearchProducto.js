import React, { useState } from "react";

const SearchProducto = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/tienda/buscar/${keyword}`);
    } else {
      history.push("/tienda");
    }
  };
  return (
    <form className="search-form" onSubmit={searchHandler}>
      <input
        type="search"
        placeholder="Buscar producto..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchProducto;
