import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { CartContext } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/products.context";
import "./shop.styles.scss";

const Shop = () => {
  const productContext = useContext(ProductsContext);
  const cartContext = useContext(CartContext);
  const { addItemToCart } = cartContext;

  return (
    <div className="products-container">
      {productContext?.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addItemToCart={addItemToCart}
        />
      ))}
    </div>
  );
};

export default Shop;
