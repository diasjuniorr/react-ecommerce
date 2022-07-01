import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, setIsOpen } = cartContext;
  const navigate = useNavigate();

  const handlerGoToCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </CartItemsContainer>
      <Button onClick={handlerGoToCheckout}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
