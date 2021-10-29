import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faFolderOpen, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from '../../_services/token-storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-complete',
  templateUrl: './dashboard-complete.component.html',
  styleUrls: ['./dashboard-complete.component.css']
})
export class DashboardCompleteComponent implements OnInit {

  faPlusSquare = faPlusSquare;
  faFolderOpen = faFolderOpen;
  faPencilAlt = faPencilAlt;

  pyme: string;
  phone: string;
  nit: string;
  email: string;


  constructor(private token: TokenStorageService, private eventBusService: EventBusService, private router: Router) { }

  ngOnInit(): void {
    if(this.token.getToken() == null){
      this.eventBusService.emit(new EventData('logout', null));
    } else {
      let user = this.token.getUser();
      this.pyme = user.company;
      this.phone = user.phone;
      this.nit = user.nit_company;
      this.email = user.email;
    }
  }

  onDocuments() {
    this.router.navigate(['/documentos']);
  }

  onLogout() {
    this.eventBusService.emit(new EventData('logout', null));
  }

  onDashboard() {
    this.router.navigate(['/dashboard/complete']);
  }

  onDashboardComplete() {
    this.router.navigate(['/dashboard/complete']);
  }

}
