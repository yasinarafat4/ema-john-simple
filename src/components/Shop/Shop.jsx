import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  // state for event handler
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // event handler
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => {
          // console.log(product);
          return (
            <DisplayProducts
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></DisplayProducts>
          );
        })}
      </div>
      <div>
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
