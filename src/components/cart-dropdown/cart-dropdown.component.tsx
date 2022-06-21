import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, setIsOpen } = cartContext;
  const navigate = useNavigate();

  const handlerGoToCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={handlerGoToCheckout}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
