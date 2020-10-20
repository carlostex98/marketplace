import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmComponent } from './components/confirm/confirm.component';

const route : Routes =[
  {
    path : '',
    pathMatch: 'full',
    component: PrincipalComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'confirm',
    component: ConfirmComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    PrincipalComponent,
    FooterComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ConfirmComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(route,{
      paramsInheritanceStrategy: 'always'
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
