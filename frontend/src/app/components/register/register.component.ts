import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from '@angular/forms';
import { base } from '../../keys/con';
import md5 from 'md5-ts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  show: boolean = true;
  mostrar: string = '';

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    lname: new FormControl(''),
    country: new FormControl(''),
    nac: new FormControl(''),
    pss: new FormControl(''),
    pss2: new FormControl('')
  });


  ngOnInit(): void {
  }


  onSubmit(): void {

    if (this.registerForm.value.pss == this.registerForm.value.pss2) {
      //procedemos
      const url = base + "/newuser";
      this.http.post<any>(
        url,
        {
          email: this.registerForm.value.email,
          name: this.registerForm.value.name,
          lname: this.registerForm.value.lname,
          country: this.registerForm.value.country,
          nac: this.registerForm.value.nac,
          pss: md5(this.registerForm.value.pss)
        },
        { headers: this.headers }
      ).subscribe(data => this.message(data));
    } else {
      this.show = false;
      this.mostrar = 'Las contraseñas no coinciden';
    }


  }

  message(info): void {

    if (info.status == 'usr_exists') {
      this.mostrar = 'El correo ingresado ya pertenece a un usuario';
    } else {
      this.mostrar = 'Usuario creado, revisa tu correo para activar tu cuenta';
    }
    this.show = false;
  }

  regresar(): void {
    this.show = true;
  }


}
