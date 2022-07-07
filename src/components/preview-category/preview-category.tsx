import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { CartItem } from "../../shared/interfaces/products.interface";
import { addItemToCart } from "../../store/cart/cart.actions";
import { cartSelector } from "../../store/cart/cart.selector";
import ProductCard from "../product-card/product-card.component";

import { CategoryTitle, ProductsContainer } from "./preview-category.styles";

interface PreviewCategoryProps {
  categoriesMap: CategoriesMap;
}

const PreviewCategory: React.FC<PreviewCategoryProps> = ({ categoriesMap }) => {
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const handleAddItemToCart = (cartItem: CartItem) => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

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
                  addItemToCart={handleAddItemToCart}
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
