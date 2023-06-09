import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  // state for event handler
  const [cart, setCart] = useState([]);
  // state for pagination
  const [currentPage, setCurrentPage] = useState(0);

  // state for dropdown
  const [productsPerPage, setProductsPerPage] = useState(15);

  // Determine the total number of item
  const { totalProducts } = useLoaderData();

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  /*
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  */
  //  Short-cut way
  const pageNumbers = [...Array(totalPages).keys()];

  console.log(totalProducts);

  /* Previous useEffect
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
*/

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${productsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, productsPerPage]);

  // to interact stored cart
  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        //step 5
        const savedCart = [];

        // step 1: get id by looping
        for (const id in storedCart) {
          // step 2: get the product using id by find()
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
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
      });
  }, []); // set dependency

  // event handler
  const handleAddToCart = (product) => {
    /* 3rd way (super advanced)
    >>if product doesn't exist in the cart, then set quantity = 1;
    >>if exist, update quantity by 1;*/
    let newCart = [];
    const exist = cart.find((pd) => pd._id === product._id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }

    setCart(newCart);
    // connect with local storage
    addToDb(product._id);
  };

  const handelClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // onchange handler for dropdown
  const options = [5, 10, 15, 20];
  function handleSelectChange(event) {
    setProductsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => {
            // console.log(product);
            return (
              <DisplayProducts
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              ></DisplayProducts>
            );
          })}
        </div>
        <div>
          <Cart cart={cart} handelClearCart={handelClearCart}>
            <Link to="/orders">
              <button className="btn-review">
                <span>Review Order</span>{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>

      {/* Pagination Button */}
      <div className="pagination">
        <p>
          Current Page:{" "}
          <span style={{ color: "#ff9900", fontWeight: "bold" }}>
            {currentPage}
          </span>{" "}
          and Products Per Page:{" "}
          <span style={{ color: "#ff9900", fontWeight: "bold" }}>
            {productsPerPage}
          </span>
        </p>
        <div>
          {pageNumbers.map((number) => (
            <button
              onClick={() => setCurrentPage(number)}
              key={number}
              className={
                currentPage === number ? "selected" : "pagination-button"
              }
            >
              {number}
            </button>
          ))}
          <select
            value={productsPerPage}
            onChange={handleSelectChange}
            className="pagination-button"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Shop;
