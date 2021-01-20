import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DishesService} from '../dishes.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(public activeRouter: ActivatedRoute, public weather: DishesService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
   
  }

}