import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

function Detail() {
  const [products, setProducts] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:7000/" + id)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Detail Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="detail">
        <i className={products.image}></i>
        <h4>{products.name}</h4>
        <p>{products.desc}</p>
        <p>${products.price}</p>
      </div>
    </>
  );
}

export default Detail;
