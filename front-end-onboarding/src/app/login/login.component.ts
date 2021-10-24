import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { TestService } from '../_services/test.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



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
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  names = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private testService: TestService, private spinner: SpinnerVisibilityService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles;
      const user = this.tokenStorage.getUser();
      this.names = user.first_name + ' ' + user.last_name;
    }
    /*this.testService.getPublicContent().subscribe(
      data => {
        console.log('data response',data);
      },
      err => {
        console.log('error message',err.error.message);
      }
    );*/
  }

  onRegister(): void {
    window.location.href="/registrate";
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
        this.reloadPage();
      },
      err => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.href="/dashboard";
  }
}
