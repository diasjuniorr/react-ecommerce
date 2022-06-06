import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartContext = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(cartContext.isOpen);

  useEffect(() => {
    setIsOpen(cartContext.isOpen);
  }, [cartContext.isOpen]);

  return (
    <div className={`${!isOpen && "hidden"} cart-dropdown-container`}>
      <div className="cart-items" />
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
