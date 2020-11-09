import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.css']
})
export class ConvComponent implements OnInit {

  constructor(public http: HttpClient, private _data: DataService, private router: Router, private _ac: ActivatedRoute) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  mens: any = [];
  idconv: any = 0;

  comForm = new FormGroup({
    msj: new FormControl('')
  });

  ngOnInit(): void {
    this._ac.paramMap.subscribe(
      params => {
        this.idconv = +params.get('idconv');
      }
    );
    this.llenarMensajes();
  }

  llenarMensajes():void{
    const url = `${base}/conv/${this.idconv}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data) });
  }

  setX(e):void{
    this.mens = e;
  }

  enviarMsj():void{
    let a = this.comForm.value.msj;
    const url = base + "/nmens";
    this.http.post<any>(
      url,
      {
        id_usuario: this._data.id_usuario,
        id_conv: this.idconv,
        texto: a
      },
      { headers: this.headers }
    ).subscribe(data => {this.mens.push(data)});
  }

}
