import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCountContainer } from "./cart-icon.styles";

const CartIcon = () => {
  const cartContext = useContext(CartContext);
  const { cartCount } = cartContext;

  const handleToggleCartDropdown = () =>
    cartContext.setIsOpen(!cartContext.isOpen);

  return (
    <CartIconContainer onClick={handleToggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCountContainer>{cartCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
