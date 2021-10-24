import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import CardItem  from '../model/card-item';
import { DetailsServiceService } from '../_services/details-service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';
import { UploadService } from '../_services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  items: CardItem[] = [];

  constructor(private userService: UserService, private detailsservice: DetailsServiceService, private token: TokenStorageService, private eventBusService: EventBusService, private service: UploadService) {}

  ngOnInit(): void {
    if(this.token.getToken() == null){
      this.eventBusService.emit(new EventData('logout', null));
    }

    /*this.service.fetchImages(this.token.getUser().username).subscribe(
      (data:any) => {
        
        for(let i = 0; i< data.length; i++) {
          let item: CardItem = {
            image: "https://res.cloudinary.com/practicaldev/image/fetch/s--DYfpZirq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/990/1%2AOc2PsJ-QKOUG2I8J3HNmWQ.png",
            title: data[i].title,
            description: data[i].description,
            images: data[i].images
          };
          this.items.push(item);
        }
      },
      err => {
        console.log(err.error.message);
      }
    );*/
    
  }

  selectCard(item: CardItem) {
    //console.log('item selected', item);
    this.detailsservice.CardSelected(item);
  }
}
