import React, { useState } from 'react';
import "./search.scss";

const Search = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    onSearchChange(searchInput);
  }

  return (
    <section className="section-search">
      <div className="shell">
        <div className="section__inner">
          <form className="search-form">
            <input
              type="text"
              placeholder="Search location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button onClick={handleClick} className="btn btn--search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Search