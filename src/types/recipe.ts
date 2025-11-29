import { Ingredient } from './ingredient';

export interface IRecipeIngredient {
  id: string;
  ingredientId: string;
  quantity: number;
  ingredient: Ingredient;
}

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  ingredients: IRecipeIngredient[];
}