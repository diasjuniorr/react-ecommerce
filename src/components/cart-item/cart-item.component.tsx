interface CartItemProps {
  quantity: number;
  name: string;
}

const CartItem: React.FC<CartItemProps> = ({ quantity, name }) => {
  return (
    <div>
      <h1>{name}</h1>
      <span>{quantity}</span>
    </div>
  );
};

export default CartItem;
