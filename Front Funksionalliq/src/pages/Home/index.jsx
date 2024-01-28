import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { BasketContext } from "../../context/basketContext";
import { WishlistContext } from "../../context/wishlistContext";
import "./style.scss";

function Home() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const { addBasket } = useContext(BasketContext);
  const { addRemoveWishlist, checkIsWishlist } = useContext(WishlistContext);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function search(e) {
    setInput(e.target.value);
  }

  function lower(data) {
    if (typeof data === "string") {
      return data.toLowerCase();
    }
    return data;
  }

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="home">
        <input
          type="text"
          value={input}
          onChange={search}
          placeholder="search"
        />
        <button onClick={() => setSort({ property: "name", asc: true })}>
          A-Z
        </button>
        <button onClick={() => setSort({ property: "name", asc: false })}>
          Z-A
        </button>
        <button onClick={() => setSort(null)}>Default</button>
        <button onClick={() => setSort({ property: "price", asc: true })}>
          Artan
        </button>
        <button onClick={() => setSort({ property: "price", asc: false })}>
          Azalan
        </button>
        <br />
        <br />
        <div className="cards" >
          {products
            .filter((x) =>  x.name.toLowerCase().includes(input.toLowerCase()) ) //search
            .sort((a, b) => {
              if (sort && sort.asc === true) {
                return lower(a[sort.property]) > lower(b[sort.property]) ? 1 : lower(b[sort.property]) > lower(a[sort.property]) ? -1 : 0;
              } else if (sort && sort.asc === false) {
                return lower(a[sort.property]) < lower(b[sort.property]) ? 1 : lower(b[sort.property]) < lower(a[sort.property]) ? -1 : 0;
              } else {
                return 0;
              }
            })
            .map((x) => (
              <div key={x._id} >
                <div
                  className="card"
                  style={{ width: "300px", border: "1px solid black" }}
                >
                  <i className={x.image}></i>
                  <i
                    className={`${
                      checkIsWishlist(x)
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
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
                    <NavLink to={"/detail/" + x._id}>detail</NavLink>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
