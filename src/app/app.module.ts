import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';

/**
 * Deze is double quotes, de rest enkele quotes. Vaak heb je een tooltje die dit soort dingen programmatisch oplost voor je.
 * Check bijvoorbeeld "prettier". Alternatief is om in je IDE de regels in te stellen en dan een commando te runnen om het automatisch te formatteren.
 */
import { MatDialogModule } from "@angular/material/dialog";

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DishesService } from './dishes.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { UiService } from './ui.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/**
 * Dit gaat niet goed. Krijg de foutmelding: Error: ./src/app/app.module.ts
 Module not found: Error: Can't resolve '@ng-bootstrap/ng-bootstrap' in '/Users/robin/Documents/repos/Clients/alliander/dinner_app/src/app'

 En dat is logisch want deze package is niet opgenomen in het package.json bestand. Elke keer als je een dependency gebruikt moet deze in de node_modules folder aanwezig zijn.
 Dit doe je niet met de hand maar door met een terminal de dependency formeer te installeren. En vervolgens deze verwijzing naar de dependency (die is aangemaakt in de package.json)
 te commiten naar git. Want als ik npm install uitvoer installeert de IDE alle packages. Maar deze staat er niet tussen dus waarschijnlijk heb je em niet gecommit.

 Oplossing:
 run npm i @ng-bootstrap/ng-bootstrap
 Commit de package.json
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatButtonModule,
    NgbModule,
    MatDialogModule
  ],
  providers: [
    DishesService,
    UiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})

export class AppModule {
}
