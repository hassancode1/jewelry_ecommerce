import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
export const ShoppingcartContext = createContext();

const cartFromLocalStorage =
  JSON.parse(localStorage.getItem("cartitems")) || [];

function Shoppingcart(props) {
  const [cartitems, setCartitems] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartitems));
  }, [cartitems]);

  const handleAddProduct = (product) => {
    const productExit = cartitems.find((item) => item.id === product.id);
    toast.success('product added successfully')
    if (productExit) {
      setCartitems(
        cartitems.map((item) =>
          item.id === productExit.id
            ? { ...productExit, quantity: productExit.attributes.Qty  > productExit.quantity  ?  productExit.quantity +1 : productExit.quantity}
            : item
        )
      );
    } else {
      setCartitems([...cartitems, { ...product, quantity: 1 }]);
    }
  };
  const handleRemoveProduct = (product) => {
    const productExit = cartitems.find((item) => item.id === product.id);
    if (productExit.quantity === 1) {
      setCartitems(cartitems.filter((item) => item.id !== product.id));
    } else {
      setCartitems(
        cartitems.map((item) =>
          item.id === product.id
            ? { ...productExit, quantity: productExit.quantity - 1 }
            : item
        )
      );
    }
  };
  const handleRemove = (product) => {

      setCartitems(cartitems.filter((item) => item.id !== product.id));
      toast.success('product removed from cart')
  };
  const increaseQuantity = (product) => {
    const productExit = cartitems.find((item) => item.id === product.id);
    if (productExit) {
      setCartitems(
        cartitems.map((item) =>
          item.id === product.id
            ? { ...productExit, quantity: productExit.quantity + 1 }
            : item
        )
      );
    }
  };
  const setQuantity = (product, amount) => {
    const productExit = [...cartitems];
    if (amount >= 1) {
      productExit.find((item) => item.id === product.id).quantity = amount;
    } else {
      setCartitems(cartitems.filter((item) => item.id !== product.id));
    }

    setCartitems(productExit);
  };

  const calculateTotal = () => {
    return cartitems?.reduce(
      (sum, { quantity, attributes }) => sum + attributes.price * quantity,
      0
    );
  };

  const value = {
    handleAddProduct,
    cartitems,
    handleRemoveProduct,
    handleRemove,
    increaseQuantity,
    setQuantity,
    calculateTotal,
    setCartitems,
  };
  return (
    <ShoppingcartContext.Provider value={value}>
      {props.children}
    </ShoppingcartContext.Provider>
  );
}

export default Shoppingcart;
