import { CartItem } from "../../shared/interfaces/products.interface";
import "./cart-item.styles.scss";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>{quantity}</span>
        <span>{`$${price * quantity}`}</span>
      </div>
    </div>
  );
};

export default CartItemComponent;
