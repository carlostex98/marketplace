import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from '@angular/forms';
import { base } from '../../keys/con';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient, private _data: DataService) { }

  show: boolean = false;
  mostrar: string = '';
  dato:any;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    lname: new FormControl(''),
    country: new FormControl(''),
    nac: new FormControl('')
  });

  ngOnInit(): void {
    this.requestUserData();
    
  }

  onSubmit(): void {
    //obtener data y hacer post
    const url = base + "/modifaccount";
      this.http.post<any>(
        url,
        {
          email: this.registerForm.value.email,
          name: this.registerForm.value.name,
          lname: this.registerForm.value.lname,
          nac: this.registerForm.value.nac
        },
        { headers: this.headers }
      ).subscribe(data => this.message());

  }
  requestUserData(): void {
    let dato: any;

    //procedemos
    const url = base + "/account";
    this.http.post<any>(
      url,
      {
        id_usuario: this._data.id_usuario,
      },
      { headers: this.headers }
    ).subscribe(data => { this.modu(data)});
    
  }

  modu(data){
    this.dato=data;
    let etx:any = this.dato;

    this.registerForm.setValue({
      email: etx.CORREO,
      name: etx.NOMBRE,
      lname: etx.APELLIDO,
      country: '',
      nac: etx.NACIMIENTO
    });
  }

  message(): void {

    this.mostrar = "Datos actualizados"
    this.show = true;
  }

  regresar(): void {
    this.show = false;
  }



}
