import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss"
function Navbar() {
  return (
    <>
      <div className="navbar">
        <ul>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/addPage"}>Add Page</NavLink></li>
            <li><NavLink to={"/basket"}>Basket</NavLink></li>
            <li><NavLink to={"/wishlist"}>Wishlist</NavLink></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
