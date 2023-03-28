import React, { useEffect, useState } from "react";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="shop-container">
      <div className="">
        <h2>Total Products: {products.length}</h2>
      </div>
      <div className="cart-container">
        <h3>Order Summary</h3>
      </div>
      <div className="products-container">
        {products.map((product) => {
          // console.log(product);
          return (
            <DisplayProducts
              key={product.id}
              product={product}
            ></DisplayProducts>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
