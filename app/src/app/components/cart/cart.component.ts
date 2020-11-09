import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  prods: any = new Array;
  money = 0;

  constructor(public http: HttpClient, private _data: DataService, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ngOnInit(): void {
    this.llenarCarro();
  }


  llenarCarro(): void {
    let e = +(this._data.id_usuario);

    const url = `${base}/cart/${e}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data) });

    const url2 = `${base}/ctotal/${e}`;
    this.http.get<any>(
      url2
    ).subscribe(data => { this.setY(data) });
  }

  setX(e): void {
    this.prods = e;
  }
  setY(e): void {
    this.money = e.total;
  }


  modCant(id_prod, cant): void {
    let a = +id_prod;
    let b = +cant;
    let s = +this._data.id_usuario;
    b++;

    const url = base + "/mcprod";
    this.http.post<any>(
      url,
      {
        id_usuario: s,
        id_producto: a,
        cantidad: b
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
  }

  quitar(id_prod): void {
    let a = +id_prod;

    let s = +this._data.id_usuario;

    const url = base + "/dcprod";
    this.http.post<any>(
      url,
      {
        id_usuario: s,
        id_producto: a
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
    this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
    });
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
  }

  vaciarcart():void{
   
    let s = +this._data.id_usuario;

    const url = base + "/delcart";
    this.http.post<any>(
      url,
      {
        id_usuario: s
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
    this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
      this.router.navigate(['cart']);
    });
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
    this.llenarCarro();
  }

  comprar():void{
    let s = +this._data.id_usuario;

    const url = base + "/xcompra";
    this.http.post<any>(
      url,
      {
        id_usuario: s
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
  }


}
