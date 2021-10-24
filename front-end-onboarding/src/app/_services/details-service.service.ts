import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import CardItem from '../model/card-item';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService {

  private cardSelected = new BehaviorSubject<any>([]);
  cardSelected$ = this.cardSelected.asObservable();

  constructor() { }

  CardSelected(item: CardItem){
    //console.log('item in service',item);
    this.cardSelected.next(item);
  }
}
