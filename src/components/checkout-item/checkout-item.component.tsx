import { CartItem } from "../../shared/interfaces/products.interface";
import "./checkout-item.styles.scss";

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

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemFromCart(cartItem)}>
          &#60;
        </div>
        <div className="value">{quantity}</div>
        <div className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#62;
        </div>
      </span>
      <span className="price">{`$${price * quantity}`}</span>
      <div className="remove-button" onClick={() => removeAllItems(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
