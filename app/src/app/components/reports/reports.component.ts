import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(public http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  etq: any = [true, false, false, false, false, false, false, false];

  r1 = [];
  r2 = [];
  r3 = [];
  r4 = [];
  r5 = [];
  r5x = [];
  r6 = [];
  r7 = [];
  r8 = [];

  ngOnInit(): void {
    this.rep1();
    this.rep2();
    this.rep3();
    this.rep4();
    this.rep5();
    this.rep5x();
    this.rep6();
    this.rep7();
    this.rep8();
  }

  etiqueta(num): void {
    for (let i = 0; i < this.etq.length; i++) {
      if (i == num) {
        this.etq[num] = true;
      } else {
        this.etq[i] = false;
      }
    }
  }

  public rep1():void{
    //console.log("yes");
    const url = base + "/bitacora";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set1(data); });
  }

  set1(dta):void{
    this.r1 = dta;
  }

  cambio():void{
    this.r1 = this.r1.slice().reverse();
  }
  

  public rep2():void{
    //console.log("yes");
    const url = base + "/rep2";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set2(data); });
  }

  set2(dta):void{
    this.r2 = dta;
  }


  public rep3():void{
    //console.log("yes");
    const url = base + "/rep3";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set3(data); });
  }

  set3(dta):void{
    this.r3 = dta;
  }


  public rep4():void{
    //console.log("yes");
    const url = base + "/rep4";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set4(data); });
  }

  set4(dta):void{
    this.r4 = dta;
  }


  public rep5():void{
    //console.log("yes");
    const url = base + "/rep5";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set5(data); });
  }

  set5(dta):void{
    this.r5 = dta;
  }

  public rep5x():void{
    //console.log("yes");
    const url = base + "/rep5x";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set5x(data); });
  }

  set5x(dta):void{
    this.r5x = dta;
  }


  public rep6():void{
    //console.log("yes");
    const url = base + "/rep6";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set6(data); });
  }

  set6(dta):void{
    this.r6 = dta;
  }


  public rep7():void{
    //console.log("yes");
    const url = base + "/rep7";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set7(data); });
  }

  set7(dta):void{
    this.r7= dta;
  }


  public rep8():void{
    //console.log("yes");
    const url = base + "/rep8";
    this.http.get<any>(
      url
    ).subscribe(data => { this.set8(data); });
  }

  set8(dta):void{
    this.r8 = dta;
  }
  



}
