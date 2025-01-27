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
import { CategoriesComponent } from './components/categories/categories.component';
import { UsersComponent } from './components/users/users.component';
import { AccountComponent } from './components/account/account.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { DetailComponent } from './components/detail/detail.component';
import { CartComponent } from './components/cart/cart.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ConvComponent } from './components/conv/conv.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RecoverComponent } from './components/recover/recover.component';

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
  },
  {
    path:'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateproductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:idp',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'denuncias',
    component: DenunciasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chats',
    component: ChatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conv/:idconv',
    component: ConvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recover',
    component: RecoverComponent
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
    ConfirmComponent,
    CategoriesComponent,
    UsersComponent,
    AccountComponent,
    CreateproductComponent,
    DetailComponent,
    CartComponent,
    DenunciasComponent,
    ChatsComponent,
    ConvComponent,
    ReportsComponent,
    RecoverComponent
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
