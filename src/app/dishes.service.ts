import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

// var is een oude aanduiding voor een variable. Gebruik const (set once) of let (set anytime)
declare var require: any;


/**
 * PS: zet deze in een shared map. Of in de map waar de service betrekking op heeft (als dat er maar een is)
 */
@Injectable({
    providedIn: 'root'
})
export class DishesService {

    constructor(private http: HttpClient) {
    }

    API_KEY = 'df6f6d2cee0d4fcc82920812d087145f';

    test = require('../assets/return.json');

    real_api: boolean = true;
    get_query: string = '';

    private sharedDishes = new BehaviorSubject<any>(this.test);

    sharedDishes$ = this.sharedDishes.asObservable();

    publishDishes(data: BehaviorSubject<any>) {
        this.sharedDishes.next(data);
        console.log('published new data, namely: ');
        console.log(data);
    }

    // Voor deze functies, het is niet zo netjes om de GET url uit deze functie te zetten omdat het echt alleen van toepassing is op deze functie. Ook biedt de HTTPClient zelf params ondersteuning,
    // Zie voorbeeld onderin:
    public sendGetRequest(tags: any) {
        console.log('arrived in sendGetRequest');
        if (this.real_api) {
            let allTagsConcatenated = '';
            let tags_query;

            for (const tag of tags) {
                allTagsConcatenated = allTagsConcatenated + tag.name.toLowerCase() + ',';
            }

            if (allTagsConcatenated?.endsWith(',')) {
                tags_query = allTagsConcatenated?.slice(0, -1);
            }
            this.get_query = `https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`;
            console.log('returned object from getrequest');
            return this.http.get(this.get_query);

        } else {
            console.log('De testquery is: ');
            console.log(this.test);
            console.log('returned object from test request');
            return of(this.test);

        }
    }

    // PS ongeteste code, maar het gaat om het params object
    // public sendGetRequest(tags: any) {
    //     return this.real_api ?
    //         this.http.get('https://api.spoonacular.com/recipes/random', {
    //             params: {
    //               tags,
    //               apiKey: this.API_KEY
    //             }
    //         }) :
    //         of(this.test);
    // }

}
