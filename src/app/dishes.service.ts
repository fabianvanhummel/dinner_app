import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private http: HttpClient) { }

  API_KEY = 'df6f6d2cee0d4fcc82920812d087145f';
  
  test = require('../assets/return.json');

  real_api: boolean = true
  get_query: string = ''

  private sharedDishes = new BehaviorSubject<any>(this.test);  

  sharedDishes$ = this.sharedDishes.asObservable();

  publishDishes(data: BehaviorSubject<any>) {
    this.sharedDishes.next(data);
    console.log('published new data, namely: ')
    console.log(data)
  }

  public sendGetRequest(tags: any){
    console.log('arrived in sendGetRequest')
    if(this.real_api) {
      let allTagsConcatenated = "";
      let tags_query

      for (const tag of tags) {
        allTagsConcatenated = allTagsConcatenated + tag.name.toLowerCase() + ',';
      }
  
      if (allTagsConcatenated?.endsWith(',')) {
        tags_query = allTagsConcatenated?.slice(0, -1) 
      }

      this.get_query = `https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`
      console.log('returned object from getrequest')
      return this.http.get(this.get_query)

    } else {
      console.log('De testquery is: ')
      console.log(this.test)
      console.log('returned object from test request')
      return of(this.test)

    }
  }
}