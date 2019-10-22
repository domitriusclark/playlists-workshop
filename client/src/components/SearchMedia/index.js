import React from "react";

const SearchMedia = ({ setSearch, value, setValue }) => {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          return setSearch(value);
        }}
      >
        <div>
          <input onChange={e => setValue(e.target.value)} />
          <button>Search</button>
        </div>
      </form>

    </div>
  );
};

export default SearchMedia;