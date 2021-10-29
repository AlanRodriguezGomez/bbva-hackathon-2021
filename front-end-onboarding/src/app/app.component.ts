import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isSuccessfulSignedUp = false;
  username?: string;

  faSearch = faSearch;
  faUser = faUser;
  faBars = faBars;

  navbarOpen = false;


  eventBusSub?: Subscription;


  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService, private router: Router, private ds: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.eventBusSub = this.eventBusService.on('signedUp', () => {
      this.navbarOpen = false;
      console.log('Toggled!');
    });

    this.eventBusSub = this.eventBusService.on('loggedIn', (value: boolean) => {
      this.isLoggedIn = value;
    })

  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.router.navigate(['/landing']);
    this.navbarOpen = false;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
