import { Component, OnDestroy, OnInit } from '@angular/core';
import CardItem from 'src/app/model/card-item';
import { DetailsServiceService } from 'src/app/_services/details-service.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  card:CardItem = {
    title: '',
    description: '',
    image: '',
    images: []
  };

  constructor(private detailsservice: DetailsServiceService, private token: TokenStorageService, private bus: EventBusService) {
    
   this.detailsservice.cardSelected$.subscribe((result: CardItem) => {
      //console.log('result',result);
      this.card = result;
    });

    if(this.token.getToken() == null || this.card.images == undefined){
      this.bus.emit(new EventData('logout', null));
    }
  }

  ngOnInit(): void {}

}
