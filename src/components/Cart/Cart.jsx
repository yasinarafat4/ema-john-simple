import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, handelClearCart, children }) => {
  console.log(cart);

  /*
  (option 3) write cart directly as parameter inside {}
  const Cart = (props) => {
  const cart = props.cart; (option 1)
  const { cart } = props; (option 2)
  */

  /*
  >> sum of all product's price
  let totalPrice = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
  }

  >> sum of total shipping
  let totalShipping = 0;
  for (const product of cart) {
    totalShipping = totalShipping + product.shipping;
  }
  */

  // Or both total price and total shipping in together(shortcut way)
  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    /* 
    >> short cut ways (super advance way in the shop.jsx file)
    >> way 1
    if (product.quantity === 0) {
      product.quantity = 1;
    }

    >> way 2
    product.quantity = product.quantity || 1;
*/
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping * product.quantity;
    quantity = quantity + product.quantity;
  }
  // tax from total of 5%
  const tax = (totalPrice * 5) / 100;

  // grand total price
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart-container">
      <h5 className="cart-heading">Order Summary</h5>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping} </p>
      <p>Tax: ${tax.toFixed(2)} </p>
      <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
      <button onClick={handelClearCart} className="btn-clear-cart">
        <span>Clear Cart</span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {children}
    </div>
  );
};

export default Cart;
