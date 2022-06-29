import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import ProductCard from "../product-card/product-card.component";

import { CategoryTitle, ProductsContainer } from "./preview-category.styles";

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
            <CategoryTitle className="category-title">
              <Link to={`/shop/${key}`}>{key}</Link>
            </CategoryTitle>
            <ProductsContainer>
              {category.slice(0, 4).map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  addItemToCart={addItemToCart}
                />
              ))}
            </ProductsContainer>
          </div>
        );
      })}
    </>
  );
};

export default PreviewCategory;
