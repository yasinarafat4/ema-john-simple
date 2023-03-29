import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
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
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
  }
  // tax from total of 5%
  const tax = (totalPrice * 5) / 100;

  // grand total price
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart-container">
      <h5 className="cart-heading">Order Summary</h5>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping} </p>
      <p>Tax: ${tax.toFixed(2)} </p>
      <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
    </div>
  );
};

export default Cart;
