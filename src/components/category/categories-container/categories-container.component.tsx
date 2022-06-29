import { CategoryItem } from "../category-item/category-item.component";
import { Container } from "./categories.styles";

interface CategoriesProps {
  categories: Category[];
}

interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

export const CategoriesContainer: React.FC<CategoriesProps> = ({
  categories,
}) => {
  return (
    <Container>
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </Container>
  );
};
