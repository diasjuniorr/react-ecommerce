import Button from "../button/button.component";
import "./product-card.styles.scss";

interface ProductCardProps {
  product: Product;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button className=" inverted button">ADD TO CARD</Button>
    </div>
  );
};

export default ProductCard;
