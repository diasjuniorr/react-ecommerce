import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { setIsOpen } from "../../store/cart/cart.actions";
import { selectCartCount } from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCountContainer } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  const handleToggleCartDropdown = () => dispatch(setIsOpen());

  return (
    <CartIconContainer onClick={handleToggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCountContainer>{cartCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
