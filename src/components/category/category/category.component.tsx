import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../store/cart/cart.actions";
import {
  CategoriesMap,
  Item,
} from "../../../shared/interfaces/category.interface";
import ProductCard from "../../product-card/product-card.component";
import { CategoryTitle, ProductsContainer } from "./preview-category.styles";
import { CartItem } from "../../../shared/interfaces/products.interface";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { isLoadingSelector } from "../../../store/categories/categories.selector";
import Spinner from "../../spinner/spinner.component";

interface CategoryProps {
  categoriesMap: CategoriesMap;
}

const Category: React.FC<CategoryProps> = ({ categoriesMap }) => {
  const { categoryID } = useParams();
  const cartItems = useSelector(selectCartItems);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  const [category, setCategory] = useState<Item[]>(
    categoriesMap[categoryID as string]
  );

  const handleAddItemToCart = (cartItem: CartItem) => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  useEffect(() => {
    setCategory(categoriesMap[categoryID as string]);
  }, [categoryID, categoriesMap]);

  if (isLoading) return <Spinner />;

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
              addItemToCart={handleAddItemToCart}
            />
          ))}
        </ProductsContainer>
      )}
    </>
  );
};

export default Category;
