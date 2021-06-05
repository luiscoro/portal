import React, { useState } from "react";

const SearchNoticia = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/buscar/${keyword}`);
    } else {
      history.push("/noticias");
    }
  };
  return (
    <form className="search-form" onSubmit={searchHandler}>
      <input
        type="search"
        placeholder="Buscar noticia..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchNoticia;
