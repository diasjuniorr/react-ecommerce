import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import ProductCard from "../product-card/product-card.component";

import "./preview-category.styles.scss";

interface PreviewCategoryProps {
  categoriesMap: CategoriesMap;
}

const PreviewCategory: React.FC<PreviewCategoryProps> = ({ categoriesMap }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <>
      {Object.keys(categoriesMap).map((key) => {
        const category = categoriesMap[key];
        return (
          <div key={key}>
            <h2 className="category-title">
              <Link to={`/shop/${key}`}>
                <span>{key}</span>
              </Link>
            </h2>
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

export default PreviewCategory;
