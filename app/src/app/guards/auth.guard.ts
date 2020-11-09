import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private _data:DataService, private router:Router, private coo:CookieService){}

  a:any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.validate();
      if(!this._data.logueado){
        this.router.navigate(['login']);
      }
    return this._data.logueado;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  validate():void{
    this.a = this.coo.get('auth');
    if(this.a=='yes'){
      this._data.logueado=true;
      this._data.id_usuario=this.coo.get('id_usuario');
    }
  }
  
}
