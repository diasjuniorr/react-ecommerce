import { CategoriesMap } from "../../shared/interfaces/category.interface";
import { CategoriesState } from "./categories.types";

interface State {
  categories: CategoriesState;
}

export const categoriesSelector = (state: State) => {
  console.log("debug categoriesSelector ", state.categories);
  return state.categories.categories.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoriesMap);
};
