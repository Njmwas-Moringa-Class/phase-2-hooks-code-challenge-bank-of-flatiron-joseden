// Search.js
// Search.js
import React from "react";

function Search({ handleSearch }) {
  const handleChange = (e) => {
    const term = e.target.value;
    handleSearch(term);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
