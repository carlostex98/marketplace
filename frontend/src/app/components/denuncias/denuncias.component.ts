import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  constructor(public http: HttpClient, private _data: DataService, private router: Router) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  denuncias: any = new Array;

  ngOnInit(): void {
    this.llenarDenuncias();
  }

  llenarDenuncias():void{
    const url = `${base}/denuncias`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data) });
  }

  setX(datos):void{
    this.denuncias = datos;
  }

  desactivarProducto(id_producto):void{

    const url = base + "/desactivar";
    this.http.post<any>(
      url,
      {
        id_producto: id_producto,
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
    this.router.navigateByUrl('/denuncias', { skipLocationChange: true }).then(() => {
      this.router.navigate(['denuncias']);
    });
    
  }

  activarProducto(id_producto):void{

    const url = base + "/activar";
    this.http.post<any>(
      url,
      {
        id_producto: id_producto,
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data) });
    this.router.navigateByUrl('/denuncias', { skipLocationChange: true }).then(() => {
      this.router.navigate(['denuncias']);
    });
    
  }

}
