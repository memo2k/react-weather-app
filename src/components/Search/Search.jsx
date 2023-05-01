import React from 'react';
import "./search.scss";

const Search = () => {
  return (
    <section className="section-search">
      <div className="shell">
        <div className="section__inner">
          <form className="search-form">
            <input
              type="text"
              placeholder="Search location"
            />

            <button className="btn btn--search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Search