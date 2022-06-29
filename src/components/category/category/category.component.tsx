import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../contexts/cart.context";
import {
  CategoriesMap,
  Items,
} from "../../../shared/interfaces/category.interface";
import ProductCard from "../../product-card/product-card.component";
import { CategoryTitle, ProductsContainer } from "./preview-category.styles";

interface CategoryProps {
  categoriesMap: CategoriesMap;
}

const Category: React.FC<CategoryProps> = ({ categoriesMap }) => {
  const { categoryID } = useParams();
  const { addItemToCart } = useContext(CartContext);

  const [category, setCategory] = useState<Items[]>(
    categoriesMap[categoryID as string]
  );

  useEffect(() => {
    setCategory(categoriesMap[categoryID as string]);
  }, [categoryID, categoriesMap]);

  return (
    <>
      <CategoryTitle className="category-title">
        <span>{categoryID}</span>
      </CategoryTitle>
      {category && (
        <ProductsContainer>
          {category.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addItemToCart={addItemToCart}
            />
          ))}
        </ProductsContainer>
      )}
    </>
  );
};

export default Category;
