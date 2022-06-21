import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout: React.FC = () => {
  const cartContext = useContext(CartContext);
  const {
    cartItems,
    cartTotal,
    addItemToCart,
    removeItemFromCart,
    removeAllItems,
  } = cartContext;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem
            key={cartItem.id}
            cartItem={cartItem}
            removeItemFromCart={removeItemFromCart}
            addItemToCart={addItemToCart}
            removeAllItems={removeAllItems}
          />
        );
      })}
      <span className="total">Total ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
