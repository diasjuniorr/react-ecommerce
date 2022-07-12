import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { CartItem } from "../../shared/interfaces/products.interface";
import { addItemToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";
import { isLoadingSelector } from "../../store/categories/categories.selector";
import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";

import { CategoryTitle, ProductsContainer } from "./preview-category.styles";

interface PreviewCategoryProps {
  categoriesMap: CategoriesMap;
}

const PreviewCategory: React.FC<PreviewCategoryProps> = ({ categoriesMap }) => {
  const cartItems = useSelector(selectCartItems);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  const handleAddItemToCart = (cartItem: CartItem) => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  if (isLoading) return <Spinner />;

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
