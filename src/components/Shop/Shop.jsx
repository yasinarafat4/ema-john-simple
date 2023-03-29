import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
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

  // to interact stored cart
  useEffect(() => {
    const storedCart = getShoppingCart();

    //step 5
    const savedCart = [];

    // step 1: get id by looping
    for (const id in storedCart) {
      // step 2: get the product using id by find()
      const addedProduct = products.find((product) => product.id === id);
      console.log(addedProduct);

      // step 3: get quantity of the product
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;

        // step 4: add the added product to the save cart
        savedCart.push(addedProduct);
      }
    }
    // step 5: set the cart
    setCart(savedCart);
  }, [products]); // set dependency

  // event handler
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);

    // connect with local storage
    addToDb(product.id);
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
