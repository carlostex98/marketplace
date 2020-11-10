import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { base } from 'src/app/keys/con';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  mostrar2 = "";
  show2 = false;

  st1Form = new FormGroup({
    correo: new FormControl('')
  });

  st2Form = new FormGroup({
    cod: new FormControl(''),
    ps: new FormControl('')
  });

  steps:boolean = false;

  ngOnInit(): void {
  }

  submitOne():void{
    let url = base+"/sendreset"
    this.http.post<any>(
      url,
      {
        correo: this.st1Form.value.correo
      },
      { headers: this.headers }
    ).subscribe(data => { console.log(data); this.steps = true; });
  }

  submitTwo():void{
    let url = base+"/doreset"
    this.http.post<any>(
      url,
      {
        correo: this.st1Form.value.correo,
        hcorreo: this.st2Form.value.cod,
        ps: this.st2Form.value.ps
      },
      { headers: this.headers }
    ).subscribe(data => { this.message2(data); });
  }

  message2(data): void {

    this.mostrar2 = "Si los datos coinciden la contraseña de ha actualizado"
    this.show2 = true;
  }

  regresar2(): void {
    this.show2 = false;
    
  }

}
