import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LandingComponent } from './landing_page/landing/landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard_page/dashboard/dashboard.component';
import { UploadComponent } from './upload_page/upload/upload.component';
import { DashboardCompleteComponent } from './dashboard_complete/dashboard-complete/dashboard-complete.component';
import { MyBootstrapModalComponent } from './modals/my-bootstrap-modal/my-bootstrap-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    DragAndDropDirective,
    LandingComponent,
    DashboardComponent,
    DashboardCompleteComponent,
    MyBootstrapModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
