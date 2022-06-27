import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { CartContext } from "../../contexts/cart.context";
import {
  CategoriesContext,
  CategoriesContextProps,
} from "../../contexts/categories.context";
import "./shop.styles.scss";

const Shop = () => {
  const categoriesContext = useContext(
    CategoriesContext
  ) as CategoriesContextProps;
  const cartContext = useContext(CartContext);
  const { categoriesMap } = categoriesContext;
  const { addItemToCart } = cartContext;

  return (
    <>
      {Object.keys(categoriesMap).map((key) => {
        const category = categoriesMap[key];
        return (
          <div key={key}>
            <h2 className="category-title">{key}</h2>
            <div className="products-container">
              {category.slice(0, 4).map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  addItemToCart={addItemToCart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Shop;
