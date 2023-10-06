import React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../constants";

const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <ul className="flex justify-center items-center gap-4">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link-hover" : "link link-primary link-hover"
            }
            to={PATHS.COUNTER}
          >
            Counter
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link-hover" : "link link-primary link-hover"
            }
            to={PATHS.TODO}
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link-hover" : "link link-primary link-hover"
            }
            to={PATHS.PRODUCTS}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link link-hover" : "link link-primary link-hover"
            }
            to={PATHS.LOGIN}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
