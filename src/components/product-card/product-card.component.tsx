import { CartItem, Product } from "../../shared/interfaces/products.interface";
import Button from "../button/button.component";
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles";

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
    <ProductCardContainer>
      <img src={product.imageUrl} alt={product.name} />
      <Footer>
        <Name>{product.name}</Name>
        <Price>{product.price}</Price>
      </Footer>
      <Button className=" inverted button" onClick={() => addProductToCart()}>
        ADD TO CARD
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
