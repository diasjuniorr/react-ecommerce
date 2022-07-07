import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { cartSelector } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  removeAllItems,
} from "../../store/cart/cart.actions";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { CartItem } from "../../shared/interfaces/products.interface";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { cartItems, cartTotal } = cart;

  const handleRemoveItemFromCart = (cartItem: CartItem) => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  const handleAddItemToCart = (cartItem: CartItem) => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  const handleRemoveAllItems = (cartItem: CartItem) => {
    dispatch(removeAllItems(cartItems, cartItem));
  };

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
            removeItemFromCart={handleRemoveItemFromCart}
            addItemToCart={handleAddItemToCart}
            removeAllItems={handleRemoveAllItems}
          />
        );
      })}
      <Total>Total ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
