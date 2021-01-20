import { Component, OnInit } from '@angular/core';
import { UiService } from './ui.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { DishesService } from './dishes.service'

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showMenu = false;
  darkModeActive: any;
  today: number = Date.now();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  dishes: any = []

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [
    { name: 'main course' }
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  constructor(public ui: UiService,
    public dishesService: DishesService) { }

    sharedDishes: any = ''

  public getAPIdata() {
    this.sharedDishes = this.dishesService.sendGetRequest(this.tags).subscribe((dishes: any) => {
      this.dishes = dishes
      console.log('werkt dit binnen de subscribe?')
      console.log(dishes)
      this.dishesService.publishDishes(dishes);
    })
    //console.log("Dit is de query: " + `https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`)
    //let query = this.http.get(`https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`).subscribe(responseData => console.log(responseData));

  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((value: any) => {
      this.darkModeActive = value;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

}


