import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private ds: UserService, private ebus: EventBusService) {
    this.ebus.emit(new EventData('signedUp', null));
   }

  ngOnInit(): void {
    this.ds.clearData();
  }

  onRegister(): void {
    this.router.navigate(['/registrate']);
  }


}
