import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishesService } from '../dishes.service';
import { UiService } from '../ui.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})

export class WeatherCardComponent implements OnInit, OnDestroy {
  condition: any;
  currentTemp: any;
  maxTemp: any;
  minTemp: any;
  darkMode: any;
  dishes: any;
  dishes_object = [
    {
      index: 0,
      title: '',
      readyInMinutes: 0,
      image: '',
      vegetarian: '',
      vegan: '',
      healthscore: '',
      priceperserving: '',
      ingredients: {},
      instructions: {}
    }
  ];
  index: number = 0
  opened: boolean = false
  darkstyling: string = ''
  dataset: any = ''
  localSharedDishes: any = ''

  constructor(public dishesService: DishesService,
    public router: Router,
    public ui: UiService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.dishesService.sharedDishes$.subscribe(
      (data: any) => {                  
          this.localSharedDishes = data;

          if(typeof this.localSharedDishes['recipes'] !== 'undefined') {
            this.dataset = this.localSharedDishes['recipes']
          } else {
            this.dataset = this.localSharedDishes
          }

          console.log('Deze data heb ik: ')
          console.log(this.dataset)
      

      console.log('arrived in weather card subscription')

      // Voor API calls moet er ['recipes'] tussen. Voor de temp solution (om niet over API budget te gaan) moet dat er niet bij staan. Fix dat zo:
      
      console.log('initiated dataset to iterate over')

      var i;

      for (i = 0; i < Object.keys(this.dataset).length; i++) {

        let veggie = ''
        let vegan = ''
        switch (this.dataset[i]['vegetarian']) {
          case true:
            // if veggie then show vinkje
            veggie = './assets/yes.png'
            break;
          case false:
            // if not veggie then show cross
            veggie = './assets/no.png'
            break;
        }

        switch (this.dataset[i]['vegan']) {
          case true:
            // if veggie then show vinkje
            vegan = './assets/yes.png'
            break;
          case false:
            // if not veggie then show cross
            vegan = './assets/no.png'
            break;
        }

        this.dishes_object[i] = {
          index: i,
          title: this.dataset[i]['title'],
          readyInMinutes: this.dataset[i]['readyInMinutes'],
          image: this.dataset[i]['image'],
          vegetarian: veggie,
          vegan: vegan,
          healthscore: this.dataset[i]['healthScore'],
          priceperserving: '$' + (this.dataset[i]['pricePerServing'] / 100).toFixed(2),
          ingredients: this.dataset[i]['extendedIngredients'],
          instructions: this.getInstructions(this.dataset[i]) 
        };
      }

      console.log('finish dishes object')
      console.log(this.dishes_object)

      this.dishes = this.dishes_object;
    });
      /*
      var i;

      for (i = 0; i < Object.keys(dishes).length; i++) {

        let veggie = ''
        let vegan = ''
        switch (dishes[i]['vegetarian']) {
          case true:
            // if veggie then show vinkje
            veggie = './assets/yes.png'
            break;
          case false:
            // if not veggie then show cross
            veggie = './assets/no.png'
            break;
        }

        switch (dishes[i]['vegan']) {
          case true:
            // if veggie then show vinkje
            vegan = './assets/yes.png'
            break;
          case false:
            // if not veggie then show cross
            vegan = './assets/no.png'
            break;
        }

        this.dishes_object[i] = {
          index: i,
          title: dishes[i]['title'],
          readyInMinutes: dishes[i]['readyInMinutes'],
          image: dishes[i]['image'],
          vegetarian: veggie,
          vegan: vegan,
          healthscore: dishes[i]['healthScore'],
          priceperserving: '$' + dishes[i]['pricePerServing'] / 100,
          ingredients: dishes[i]['extendedIngredients'],
          instructions: dishes[i]['analyzedInstructions'][0]['steps']
        };
      }

      this.dishes = this.dishes_object;
    })
    */
  }
    
  getInstructions(data: any) {
    if(data['analyzedInstructions'][0]['steps'] !== 'undefined') {
      return data['analyzedInstructions'][0]['steps']
    } else {
      return data['instructions']
    }
  }

  openDialog(input: any) {

    this.dialog.closeAll()

    if (!this.opened) {
      this.openDialogIngredients(input)

      this.openDialogRecipe(input)
      this.opened = !this.opened
    } else {
      this.opened = !this.opened
      this.dialog.closeAll()
    }

  }

  openDialogIngredients(input: any) {
    
    let index = input.index

    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '35rem';
    dialogConfig.height = '49rem';
    dialogConfig.data = input['ingredients'];

    switch (this.darkMode) {
      case true:
        this.darkstyling = 'custom-dialog-container-dark'
        break;
      case false:
        this.darkstyling = 'custom-dialog-container'
        break;
    }

    switch (index) {
      case 0:
        // if 1 then choose middle space & fly in from the right
        dialogConfig.position = {
          'top': '6rem',
          'left': '42.5rem'
        };
        console.log(this.darkstyling)
        dialogConfig.panelClass = ['animate__animated','animate__slideInRight',this.darkstyling]
        break;
      case 1:
        // if 2 then choose left space & fly in from the left
        dialogConfig.position = {
          'top': '6rem',
          'left': '5.5rem'
        };
        dialogConfig.panelClass = ['animate__animated','animate__slideInLeft',this.darkstyling]
        break;
      case 2:
        // if 3 then choose left space & fly in from the left
        dialogConfig.position = {
          'top': '6rem',
          'left': '5.5rem'
        };
        dialogConfig.panelClass = ['animate__animated','animate__slideInLeft',this.darkstyling]
        break;
    }

    this.dialog.open(DialogComponent, dialogConfig);
  }

  openDialogRecipe(input: any) {
    
    let index = input.index

    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '35rem';
    dialogConfig.height = '49rem';
    dialogConfig.data = input['instructions'];
    console.log(input['instructions'])

    switch (this.darkMode) {
      case true:
        this.darkstyling = 'custom-dialog-container-dark'
        break;
      case false:
        this.darkstyling = 'custom-dialog-container'
        break;
    }

    switch (index) {
      case 0:
        // if 1 then choose right space & fly in from the right
        dialogConfig.position = {
          'top': '6rem',
          'left': '79.5rem'
        };
        dialogConfig.panelClass = ['animate__animated','animate__slideInRight',this.darkstyling]
        break;
      case 1:
        // if 2 then choose right space & fly in from the right
        dialogConfig.position = {
          'top': '6rem',
          'left': '79.5rem'
        };
        dialogConfig.panelClass = ['animate__animated','animate__slideInRight',this.darkstyling]
        break;
      case 2:
        // if 3 then choose middle space & fly in from the left
        dialogConfig.position = {
          'top': '6rem',
          'left': '42.5rem'
        };
        dialogConfig.panelClass = ['animate__animated','animate__slideInLeft',this.darkstyling]
        break;
    }

    this.dialog.open(DialogComponent, dialogConfig);

  }

  ngOnDestroy() {

  }

}
