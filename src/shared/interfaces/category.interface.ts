export interface Items {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
}

export interface CategoriesMap {
  [key: string]: Items[];
}
