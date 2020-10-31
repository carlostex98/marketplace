import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {


  clientes: any = new Array();
  vendedores: any = new Array();

  constructor(public http: HttpClient, private _data: DataService, private router: Router) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ngOnInit(): void {
    this.llenarClientes();
    this.llenarVendedores();
  }

  llenarClientes():void{
    let a = +this._data.id_usuario;
    const url = `${base}/ccliente/${a}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data) });
  }

  setX(datos):void{
    this.clientes = datos;
  }

  setY(datos):void{
    this.vendedores = datos;
  }

  llenarVendedores():void{
    let a = +this._data.id_usuario;
    const url = `${base}/cvendedor/${a}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setY(data) });
  }

}
