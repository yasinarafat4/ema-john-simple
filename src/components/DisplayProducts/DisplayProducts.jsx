import React from "react";
import "./DisplayProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const DisplayProducts = (props) => {
  console.log(props);
  const { img, name, price, seller, ratings } = props.product;
  const handleAddToCart = props.handleAddToCart;

  return (
    <div className="product">
      <img className="product-img" src={img} alt="" />
      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p className="product-price">Price: ${price}</p>
        <p className="product-manufacturer">Manufacturer: {seller}</p>
        <p className="product-ratings">Rating: {ratings} Stars</p>
      </div>
      <button
        onClick={() => handleAddToCart(props.product)}
        className="cart-btn"
      >
        Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default DisplayProducts;
