import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { EXERCISE1, EXERCISE2 } from "../../routers/router";

const Nav = () => {
  const location = useLocation();
  return (
    <ul>
      <li>
        <Link
          to={EXERCISE1}
          className={location.pathname == EXERCISE1 ? "active" : undefined}>
          Exercise 1
        </Link>
      </li>
      <li>
        <NavLink
          to={EXERCISE2}
          className={location.pathname == EXERCISE2 ? "active" : undefined}>
          Exercise 2
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
