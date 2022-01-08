import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe("Cookie_1",
  //   "A cookie is a small file of letters and numbers downloaded on to your computer when you access certain websites. ",
  //     "https://i.pinimg.com/originals/5d/c8/32/5dc8327d9f0d967ed63c62f0995f2a29.jpg",
  //     [
  //       new Ingredient('Flour', 3),
  //       new Ingredient('Chocolate', 2),
  //       new Ingredient('Milk', 2)
  //     ]),
  //     new Recipe("Cookie_2","A cookie is a small file of letters and numbers downloaded on to your computer when you access certain websites. ",
  //     "https://i.pinimg.com/originals/5d/c8/32/5dc8327d9f0d967ed63c62f0995f2a29.jpg",
  //     [
  //       new Ingredient('Almond Flour', 6),
  //       new Ingredient('Chocolate Latte', 3),
  //       new Ingredient('Evap Milk', 3)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
