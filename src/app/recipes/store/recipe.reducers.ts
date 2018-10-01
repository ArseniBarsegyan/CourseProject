import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('A test recipe', 'this is simply a test',
      'http://del.h-cdn.co/assets/17/34/980x490/landscape-1503418862-chicken-thighs-delish.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe( 'Nuka-Cola', 'from wasteland',
      'http://i0.kym-cdn.com/photos/images/original/000/814/409/f24.jpg',
      [
        new Ingredient('Empty bottle', 1),
        new Ingredient('agave', 2),
        new Ingredient('Gloving element', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action) {
  return state;
}
