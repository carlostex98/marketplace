import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import md5 from 'md5-ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  userForm = new FormGroup({
    correo: new FormControl(''),
    pass: new FormControl('')
  });

  ngOnInit(): void {
  }


  onSubmit(): void {
    const e = this.userForm.value.correo;
    const f = md5(this.userForm.value.pass);
    const url = base+"/authuser/"+e+"/"+f;
    this.http.get(url).subscribe(data=>{
      console.log(data);
    });
  }

}
