import { CartItem, Product } from "../../shared/interfaces/products.interface";
import Button from "../button/button.component";
import "./product-card.styles.scss";

interface ProductCardProps {
  product: Product;
  addItemToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addItemToCart,
}) => {
  const addProductToCart = () => addItemToCart({ ...product, quantity: 1 });

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button className=" inverted button" onClick={() => addProductToCart()}>
        ADD TO CARD
      </Button>
    </div>
  );
};

export default ProductCard;
