import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing_page/landing/landing.component';
import { DashboardComponent } from './dashboard_page/dashboard/dashboard.component';
import { UploadComponent } from './upload_page/upload/upload.component';
import { DashboardCompleteComponent } from './dashboard_complete/dashboard-complete/dashboard-complete.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrate', component: RegisterComponent },
  { path: 'dashboard/complete', component: DashboardCompleteComponent },
  { path: 'documentos', component: UploadComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'landing', component: LandingComponent},
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
