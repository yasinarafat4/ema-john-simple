import { getShoppingCart } from "../utilities/fakedb";

const cardProductsLoader = async () => {
  const loadedProducts = await fetch("http://localhost:5000/products");
  const products = await loadedProducts.json();

  //if cart data is in database, we have to use async await
  const storedCart = getShoppingCart();
  const savedCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find((pd) => pd._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  return savedCart;
};

export default cardProductsLoader;
