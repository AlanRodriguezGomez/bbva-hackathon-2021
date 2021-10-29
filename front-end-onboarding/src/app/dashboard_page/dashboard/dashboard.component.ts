import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faFolderOpen, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private ds: UserService, private eventBusService: EventBusService, private tokenStorageService: TokenStorageService) { 
    this.eventBusService.emit(new EventData('signedUp', null));
    this.eventBusService.emit(new EventData('loggedIn', true));
  }

  faPlusSquare = faPlusSquare;
  faFolderOpen = faFolderOpen;
  faPencilAlt = faPencilAlt;

  ngOnInit(): void {
    this.ds.clearData();
    if(this.tokenStorageService.getToken() == null){
      this.eventBusService.emit(new EventData('logout', null));
    } 
  }

  onDocuments() {
    this.router.navigate(['/documentos']);
  }

  onDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onDashboardComplete() {
    this.router.navigate(['/dashboard/complete']);
  }

  onLogout() {
    this.eventBusService.emit(new EventData('logout', null));
  }

}
