import React, { useContext } from "react";
import { BasketContext } from "../../context/basketContext";
import { Helmet } from "react-helmet-async";

function Basket() {
  const { basket, removeItemBasket, increaseCount, decreaseCount, getTotal } =useContext(BasketContext);
  return (
    <>
       <Helmet>
        <title>Basket</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="basket">
        <div className="table">
          <table border={"1px solid black"} >
            <tr>
              <th>image</th>
              <th>name</th>
              <th>desc</th>
              <th>price</th>
              <th>Count</th>
              <th>total price</th>
              <th>delete</th>
            </tr>
            {basket.map((x) => (
              <>
                <tr key={x._id}> 
                  <th border={"1px solid black"}>
                    <i className={x.image}></i>
                  </th>
                  <th>
                    <h4>{x.name}</h4>
                  </th>
                  <th>
                    <p>{x.desc}</p>
                  </th>
                  <th>${x.price}</th>
                  <th>
                    <i
                      className="fa-solid fa-chevron-up"
                      onClick={() => increaseCount(x)}
                    ></i>
                    <i
                      className="fa-solid fa-chevron-down"
                      onClick={() => decreaseCount(x)}
                    ></i>
                    {x.count}
                  </th>
                  <th>${x.count * x.price}</th>
                  <th>
                    <button onClick={() => removeItemBasket(x)}>delete</button>
                  </th>
                </tr>
              </>
            ))}
          </table>
          <div className="total">
            <h3>Total: ${getTotal()}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Basket;
