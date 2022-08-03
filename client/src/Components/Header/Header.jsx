import React, { useState } from "react";

import classes from "./Header.module.css";
function Header(props) {
  const [searchData, setSearchData] = useState("");

  const handleSearchOnChange = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <div className={classes.Header}>
      <h2>Users data</h2>
      <div>
        <input
          onChange={handleSearchOnChange}
          className={classes["search-input"]}
          type="text"
          placeholder="Search Username"
        />
        <button
          className={classes["search-button"]}
          onClick={() => {
            props.onSearchOnSubmit(searchData);
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <button
        onClick={props.onShowAddUser}
        className={classes["add-user__btn"]}
      >
        Add User
      </button>
    </div>
  );
}

export default Header;
