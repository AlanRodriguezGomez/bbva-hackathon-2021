import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  faCheck = faCheck;

  public myForm: FormGroup;


  constructor(private authService: AuthService, formBuilder: FormBuilder, private spinner: SpinnerVisibilityService) {
    this.myForm = formBuilder.group({
      mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  get m(){
    return this.myForm.controls;
  }

  ngOnInit(): void {}

  onSubmit(): void {

    this.spinner.show();

    const { pyme, nit, email, password } = this.form;
        
    this.authService.register(pyme, nit, email, password, this.myForm.value.mob).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide();
        window.location.href="/login";
      },
      err => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
