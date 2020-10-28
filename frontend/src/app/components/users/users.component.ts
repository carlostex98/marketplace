import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  usr: any = [];

  ngOnInit(): void {
    this.requestUsers();
  }

  public requestUsers():void{
    console.log("yes");
    const url = base + "/users";
    this.http.get<any>(
      url
    ).subscribe(data => { this.usr=data;});
    
  }

}
