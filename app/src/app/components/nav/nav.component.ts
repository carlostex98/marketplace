import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _data:DataService, private router:Router, private coo:CookieService) { }
  l:any;

  ngOnInit(): void {
    this.l=this._data.logueado;
    //console.log("miau");
  }

  onOut():void{
    this._data.logueado=false;
    this.coo.set('auth','no');
    this.router.navigate(['login']);
  }

}
