import { Link } from "react-router-dom";
import "./category-item.styles.scss";

interface CategoryItemProps {
  category: Category;
}

interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ background: `url(${category.imageUrl})` }}
      />
      <Link className="category-body-container" to={`/shop/${category.title}`}>
        <h2>{category.title}</h2>
        <p>Shop</p>
      </Link>
    </div>
  );
};
