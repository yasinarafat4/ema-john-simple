import React from "react";
import "./DisplayProducts.css";

const DisplayProducts = (props) => {
  console.log(props);
  const { img, name, price, seller, ratings } = props.product;
  return (
    <div className="product">
      <img className="product-img" src={img} alt="" />
      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p className="product-price">Price: ${price}</p>
        <p className="product-manufacturer">Manufacturer: {seller}</p>
        <p className="product-ratings">Rating: {ratings} Stars</p>
      </div>
      <button className="cart-btn">Add to Cart</button>
    </div>
  );
};

export default DisplayProducts;
