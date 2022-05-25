import "./category-item.styles.scss"

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
        <div className="background-image" style={{background: `url(${category.imageUrl})`}}/>
        <div className="category-body-container">
            <h2>{category.title}</h2>
            <p>Shop</p>
        </div>
        </div>
    );
}