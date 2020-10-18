import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { map } from "rxjs/operators";
import md5 from 'md5-ts';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { on } from 'process';
import {DataService} from '../../services/data.service';
import { CookieService } from 'ngx-cookie-service';

import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router, private _data:DataService, private coo:CookieService) { 
    
  }

  

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  err:boolean=false;

  userForm = new FormGroup({
    correo: new FormControl(''),
    pass: new FormControl('')
  });

  ngOnInit(): void {
  }

  


  onSubmit(): void {
    const e = this.userForm.value.correo;
    const f = md5(this.userForm.value.pass);
    const url = base+"/authuser";
    this.http.post<any>(
      url,
      {
        ids:e,
        pss:f
      },
      {headers:this.headers}
    ).subscribe(data=>this.onCheck(data));

  }


  dismiss(): void{
    this.err = false;
  }

  onCheck(ee):void{

    if(ee.tipo=='inv'){
      //mal ingreso
      this.err = true;
      
    }else{
      if (ee.tipo=='A') {
        this._data.logueado=true;
        this._data.id_usuario=ee.id_usuario;
        
        this.coo.set('auth','yes');
        this.coo.set('id_usuario',ee.id_usuario);
        this.router.navigate(['dashboard']);
      } else {
        console.log("normi");
      }
    }
  }

}
