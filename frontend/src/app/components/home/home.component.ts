import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  productos: any = [];

  ngOnInit(): void {
    this.requestProd();
  }


  public requestProd():void{
    //console.log("yes");
    const url = base + "/products";
    this.http.get<any>(
      url
    ).subscribe(data => { this.productos=data; });
    
  }

}
