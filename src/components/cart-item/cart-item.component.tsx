import { CartItem } from "../../shared/interfaces/products.interface";
import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.styles";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span>{`${quantity}x $${price}`}</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItemComponent;
