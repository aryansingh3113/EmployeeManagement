import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RoughComponent } from './rough/rough.component';
import { PercentagePipe } from './Pipes/percentage.pipe';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { NavComponent } from './nav/nav.component';
import { HelpComponent } from './help/help.component';
import { EmpRegFormComponent } from './empRegForm/empRegForm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './Guards/auth.guard';
import { TopNavComponent } from './top-nav/top-nav.component';

//DEFINING ROUTING
const routes : Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent },
  //below routes are protected
  {path: 'Help', component: HelpComponent, canActivate: [AuthGuard]},
  {path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'Employee Registration', component: EmpRegFormComponent, canActivate: [AuthGuard]},
  {path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'Employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RoughComponent,
    PercentagePipe,
    ParentComponent,
    ChildComponent,
    NavComponent,
    HelpComponent,
    EmpRegFormComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent,
    EmployeeComponent,
    LoginComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
