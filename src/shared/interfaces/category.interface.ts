export interface Item {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
}

export interface CategoriesMap {
  [key: string]: Item[];
}
