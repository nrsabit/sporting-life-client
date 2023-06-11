import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
  };
  const navItems = (
    <>
      {" "}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
      {!!user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="w-full bg-[#213644] text-white">
      <div className="navbar max-w-7xl mx-auto py-0">
        <div className="">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#213644] rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <img className="w-36" src="/logo-transparent.png" alt="" />
        </div>
        <div className="navbar-center hidden lg:flex flex-1">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex justify-end gap-3">
          {!!user && (
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.ibb.co/0cNRWMB/pexels-ofarias-g-17047231.jpg"
              alt=""
            />
          )}
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-sm border-white text-white"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline btn-sm border-white text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
