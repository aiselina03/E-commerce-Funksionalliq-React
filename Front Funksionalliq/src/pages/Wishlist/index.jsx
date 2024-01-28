import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import { NavLink } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";
import { Helmet } from "react-helmet-async";

function Wishlist() {
  const { wishlist, addRemoveWishlist, checkIsWishlist } =
    useContext(WishlistContext);
  const { addBasket } = useContext(BasketContext);
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="wishlistPage">
        {wishlist.map((x) => (
          <div
            className="card"
            key={x._id}
            style={{ width: "300px", border: "1px solid black" }}
          >
            <i className={x.image}></i>
            <i
              className={`${
                checkIsWishlist(x) ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }`}
              onClick={() => addRemoveWishlist(x)}
            ></i>
            <i
              className="fa-solid fa-cart-shopping"
              onClick={() => addBasket(x)}
            ></i>
            <h4>{x.name}</h4>
            <p>{x.desc}</p>
            <p>${x.price}</p>
            <button>
              <NavLink to={"/home/" + x._id}>detail</NavLink>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Wishlist;
