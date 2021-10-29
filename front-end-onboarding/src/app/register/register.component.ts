import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    pyme: null,
    nit: null,
    email: null,
    password: null,
    terms: false
  };
  isSignUpFailed = false;
  errorMessage = '';

  faCheck = faCheck;

  public myForm: FormGroup;


  constructor(private authService: AuthService, formBuilder: FormBuilder, private spinner: SpinnerVisibilityService, private router: Router, private ds: UserService, private ebus: EventBusService) {
    this.myForm = formBuilder.group({
      mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    this.ebus.emit(new EventData('signedUp', null));
  }

  get m(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.spinner.show();

    const { pyme, nit, email, password } = this.form;
        
    this.authService.register(pyme, nit, email, password, this.myForm.value.mob).subscribe(
      data => {
        console.log(data);
        this.ds.sendData({ isSuccessfulSignedUp: true});
        this.isSignUpFailed = false;
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      err => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ngOnDestroy(){
  }
}
