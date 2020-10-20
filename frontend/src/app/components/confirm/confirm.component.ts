import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerForm = new FormGroup({
    codeh: new FormControl(''),
    mail: new FormControl('')
  });

  show: boolean = true;
  mostrar: string = '';

  ngOnInit(): void {
  }

  onSubmit(): void {
    const url = base + "/confirmar";
    this.http.post<any>(
      url,
      {
        hmail: this.registerForm.value.codeh,
        email: this.registerForm.value.mail,

      },
      { headers: this.headers }
    ).subscribe(data => console.log(data));

    this.show=false;
    this.mostrar = 'Si los datos son validos tu cuenta esta activada';

  }

  regresar(): void {
    this.show = true;
  }

}
