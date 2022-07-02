import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

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
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
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
      <Total>Total ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
