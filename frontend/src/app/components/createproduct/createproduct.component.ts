import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from '@angular/forms';
import { base } from '../../keys/con';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  constructor(private http: HttpClient, private _data: DataService) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerForm = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl(''),
    precio: new FormControl(''),
    cat_id: new FormControl(''),
    claves: new FormControl('')
  });

  show: boolean = false;
  mostrar: string = '';
  dato:any = [];

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories():void{
    const url = base + "/getcategories";
    this.http.get<any>(
      url
    ).subscribe(data => { this.cat(data)});
  }

  cat(datos):void{
    this.dato = datos;
  }

  onSubmit():void{

    //console.log(this.registerForm.value.cat_id);

    const url = base + "/newproduct";
      this.http.post<any>(
        url,
        {
          id_usuario: this._data.id_usuario,
          nombre: this.registerForm.value.nombre,
          detalle: this.registerForm.value.detalle,
          precio: this.registerForm.value.precio,
          id_categoria: this.registerForm.value.cat_id,
          claves: this.registerForm.value.claves
        },
        { headers: this.headers }
      ).subscribe(data => this.message());
  }

  message(): void {

    this.mostrar = "Producto creado"
    this.show = true;
  }

  regresar(): void {
    this.show = false;
  }



}
