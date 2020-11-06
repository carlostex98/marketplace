import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient) {
    this.getCategories();
  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  bsqForm = new FormGroup({
    cat_id: new FormControl(''),
    claves: new FormControl('')
  });

  productos: any = [];
  dato: any = [];

  ngOnInit(): void {
    
    
    this.requestProd();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCategories(): void {
    const url = base + "/getcategories";
    this.http.get<any>(
      url
    ).subscribe(data => { this.cat(data) });
  }

  cat(datos): void {
    this.dato = datos;
    //console.log(this.dato)
  }

  submitCat() {
    //this.requestProd();
    let tmp = [];
    this.productos.forEach(el => {
      if(el.CATEGORIA==this.bsqForm.value.cat_id){
        tmp.push(el);
      }
    });
    this.productos = tmp;
  }

  limpiar():void{
    this.requestProd();
  }

  submitClave() {
    let tmp = [];
    this.productos.forEach(el => {
      if(el.P_CLAVE.includes(this.bsqForm.value.claves)){
        tmp.push(el);
      }
    });
    this.productos = tmp;
  }


  public requestProd(): void {
    //console.log("yes");
    const url = base + "/products";
    this.http.get<any>(
      url
    ).subscribe(data => { this.productos = data; });


  }

  reversa(): void {
    this.productos = this.productos.slice().reverse();
  }

}
