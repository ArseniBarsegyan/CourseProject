import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');

    // return this.httpClient.put('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-c8210.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true
      });
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.store.select('auth');

    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-c8210.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
