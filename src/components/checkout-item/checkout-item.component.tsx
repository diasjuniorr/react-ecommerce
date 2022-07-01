import { CartItem } from "../../shared/interfaces/products.interface";
import {
  CheckoutItemContainer,
  ImageContainer,
  Arrow,
  Value,
  Name,
  Quantity,
  Price,
  RemoveButton,
} from "./checkout-item.styles";

interface CheckoutItemProps {
  cartItem: CartItem;
  removeItemFromCart: (item: CartItem) => void;
  addItemToCart: (item: CartItem) => void;
  removeAllItems: (item: CartItem) => void;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  cartItem,
  removeItemFromCart,
  addItemToCart,
  removeAllItems,
}) => {
  const { imageUrl, name, quantity, price } = cartItem;

  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeAllItemsHandler = () => removeAllItems(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name className="name">{name}</Name>
      <Quantity className="quantity">
        <Arrow onClick={removeItemHandler}>&#60;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#62;</Arrow>
      </Quantity>
      <Price>{`$${price * quantity}`}</Price>
      <RemoveButton onClick={removeAllItemsHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
