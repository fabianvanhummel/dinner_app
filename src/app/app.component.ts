import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from './ui.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { DishesService } from './dishes.service'
import { Subscription } from 'rxjs';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive: any;
  today: number = Date.now();

  subscriptions: Subscription = new Subscription();

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

    // Zet alle class variables boven in, is makkelijker om te lezen
    sharedDishes: any = ''

  // Je hoeft eigenlijk geen public erbij te zetten. Dit is de default namelijk https://www.typescriptlang.org/docs/handbook/classes.html
  public getAPIdata() {
    this.sharedDishes = this.dishesService.sendGetRequest(this.tags).subscribe((dishes: any) => {
      this.dishes = dishes
      console.log('werkt dit binnen de subscribe?')
      // Binnen de subscribe kan je alle kanten op. Het observable gedeelte is dan voorbij en je krijgt de data om mee te spelen in de class.
      console.log(dishes)
      this.dishesService.publishDishes(dishes);
    })
    //console.log("Dit is de query: " + `https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`)
    //let query = this.http.get(`https://api.spoonacular.com/recipes/random?number=3&tags=${tags_query}&apiKey=${this.API_KEY}`).subscribe(responseData => console.log(responseData));

  }

  ngOnInit() {
    // Dit is een warning sign dat je een memory leak krijgt. Standaard zal de browser namelijk niet het geheugen vrijmaken van deze subscribe, ook als het component is
    //destroyed. Ik heb dit opgelost in dit component voor je door een onDestory cycle toe te voegen en daar deze observable aan toe te voegen.
    this.subscriptions.add(
        this.ui.darkModeState.subscribe((value: any) => {
          this.darkModeActive = value;
        })
    );
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}


