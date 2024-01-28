import React, { createContext } from "react";
import useLocalStorage from "../hook/useLocalStorage";

export const BasketContext = createContext();

function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage("basket", []);

  function addBasket(item) {
    const itemIndex = basket.findIndex((x) => x._id === item._id);
    if (itemIndex === -1) {
      setBasket([...basket, { ...item, count: 1 }]);
    } else {
      basket[itemIndex].count++;
      setBasket([...basket]);
    }
  }

  function removeItemBasket(item) {
    setBasket(basket.filter((x) => x._id !== item._id));
  }

  function getTotal() {
    return basket.reduce((amount, x) => amount + x.price * x.count, 0);
  }

  function decreaseCount(item) {
    const itemIndex = basket.findIndex((x) => x._id === item._id);
    if (basket[itemIndex].count === 1) {
      return;
    } else {
      basket[itemIndex].count--;
      setBasket([...basket]);
    }
  }

  function increaseCount(item) {
    const itemIndex = basket.findIndex((x) => x._id === item._id);
    basket[itemIndex].count++;
    setBasket([...basket]);
  }

  const data = {
    basket,
    addBasket,
    removeItemBasket,
    getTotal,
    increaseCount,
    decreaseCount,
  };
  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}

export default BasketProvider;
