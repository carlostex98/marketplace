import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { base } from '../../keys/con';
import { DataService } from '../../services/data.service';
import md5 from 'md5-ts';
import { Observable } from 'rxjs/internal/Observable';




@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient, private _data: DataService) { }

  show: boolean = false;
  mostrar: string = '';
  dato: any;
  ct: any;
  img: any;

  show2: boolean = false;
  mostrar2: string = '';

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

  consForm = new FormGroup({
    ps: new FormControl(''),
    psx: new FormControl(''),
  });

  signup = new FormGroup({
    image: new FormControl(null, [Validators.required])
  });

  fileToUpload: File = null;

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
        nac: this.registerForm.value.nac,
        country: this.registerForm.value.country,
        id_usuario: +this._data.id_usuario
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
    ).subscribe(data => { this.modu(data) });

  }

  modu(data) {
    this.getCountry();
    this.dato = data;
    let etx: any = this.dato;
    let e = this.ct;
    this.img = `${base}/public/${etx.RUTA_FOTO}`;
    this.registerForm.setValue({
      email: etx.CORREO,
      name: etx.NOMBRE,
      lname: etx.APELLIDO,
      country: etx.NOMBRE_PAIS,
      nac: etx.NACIMIENTO
    });
  }

  getCountry(): void {
    const url = `${base}/cuser/${this._data.id_usuario}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data); });
  }

  setX(dta): void {
    //console.log(dta.NOMBRE_PAIS);
    this.ct = dta.NOMBRE_PAIS;
    //console.log(this.ct);
  }

  message(): void {

    this.mostrar = "Datos actualizados"
    this.show = true;
  }

  regresar(): void {
    this.show = false;
  }

  regresar2(): void {
    this.show2 = false;
  }

  onSubmit2(): void {
    //obtener data y hacer post
    const f = md5(this.consForm.value.ps);


    const url = base + "/modifps";
    this.http.post<any>(
      url,
      {
        id_usuario: +this._data.id_usuario,
        ps: f
      },
      { headers: this.headers }
    ).subscribe(data => this.message2());

  }

  message2(): void {

    this.mostrar2 = "Datos actualizados"
    this.show2 = true;
  }

  onSubmit3(): void {
    //obtener data y hacer post
    const formData = new FormData();
    formData.append('image', this.fileToUpload);
    formData.append('id_usuario', this._data.id_usuario);
    this.http.post<any>(`${base}/flx`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
      this.requestUserData();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  

}
