import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  console.log(cart);
  //const Cart = (props) => {
  //const cart = props.cart; (option 1)
  //const { cart } = props; (option 2)
  // option 3: write cart directly as parameter inside {}

  // sum of all product's price
  let total = 0;
  for (const product of cart) {
    total = total + product.price;
  }
  return (
    <div className="cart-container">
      <h5 className="cart-heading">Order Summary</h5>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: {total}</p>
      <p>Total Shipping:</p>
      <p>Tax:</p>
      <h6>Grand Total:</h6>
    </div>
  );
};

export default Cart;
