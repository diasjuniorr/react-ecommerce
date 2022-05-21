import { CategoryItem } from "../category-item/category-item";
import "./categories.styles.scss";



interface CategoriesProps {
    categories: Category[];
}

interface Category {
    id: number;
    title: string;
    imageUrl: string;
}

export const CategoriesContainer: React.FC<CategoriesProps> = ({categories}) => {
   return (
       <div className="categories-container">
        {categories.map((category) => {
          return <CategoryItem key={category.id} category={category} />;
        })}
      </div>
   ) 
}