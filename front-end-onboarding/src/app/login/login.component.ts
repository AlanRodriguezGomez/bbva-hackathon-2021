import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faCheck = faCheck

  form: any = {
    username: null,
    password: null
  };
  isSuccessfulSignedUp = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  names = '';
  dataPassed: any;
  subscription: Subscription;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private spinner: SpinnerVisibilityService, private ds: UserService, private router: Router, private eventBusService:EventBusService) {
     // subscribe to home component messages
     this.subscription = this.ds.getData().subscribe(x => {                  
       this.dataPassed = x; 
     });
     console.log('data-passed',this.dataPassed);
     this.eventBusService.emit(new EventData('signedUp', null));
     this.eventBusService.emit(new EventData('loggedIn', false));
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorage.getUser();
      this.names = user.first_name + ' ' + user.last_name;
    }

    if(this.dataPassed !== undefined) {
        this.isSuccessfulSignedUp = this.dataPassed.isSuccessfulSignedUp;
    }

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onRegister(): void {
    this.router.navigate(['/registrate']);
  }

  onSubmit(): void {

    this.spinner.show();

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        console.log('data',data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRefreshToken(data.refresh_token);
        const user = this.tokenStorage.getUser();
        this.names = user.first_name + ' ' + user.last_name;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.spinner.hide();
        this.ds.sendData({ isLoggedIn: true});
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
