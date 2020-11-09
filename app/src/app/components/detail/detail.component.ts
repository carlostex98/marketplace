import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public http: HttpClient, private _ac: ActivatedRoute, private _data: DataService, private router: Router) { }

  public productos: any = {};
  comentarios: any = [];
  idp: any = 0;

  public mostrar: boolean = false;
  public comp: boolean = false;
  mensaje: string = '';

  estado: number = 0;
  texto:string = '';

  l: number = 0;
  d: number = 0;




  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  comForm = new FormGroup({
    com: new FormControl('')
  });

  denForm = new FormGroup({
    den: new FormControl('')
  });

  ngOnInit(): void {
    this._ac.paramMap.subscribe(
      params => {
        this.idp = params.get('idp');
      }
    );

    this.requestProd(this.idp);
    this.requestComments(this.idp);
    this.getLikes(this.idp);
    this.mystatus(this.idp);
    this.computar();
    
  }


  public requestProd(id):void{
    let e = +id;

    const url = `${base}/detail/${e}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setX(data) });

  }

  setX(e):void{
    this.productos = e;
  }
  setY(e):void{
    this.comentarios = e;
  }

  requestComments(id):void{
    let e = +id;

    const url = `${base}/comments/${e}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setY(data) });
  }

  toCart():void{
    let a = +this.idp;
    let b = +this._data.id_usuario;
    const url = base + "/ncprod";
    this.http.post<any>(
      url,
      {
        id_usuario: b,
        id_producto: a
      },
      { headers: this.headers }
    ).subscribe(data => {this.redCart(data)});
  }

  redCart(idc):void{
    this.router.navigate(['/cart']);
  }


  addComment():void{
    let id_us = this._data.id_usuario;
    //producto idp
    //request idus, idp, idcom bay
    const url = base + "/newcomment";
    this.http.post<any>(
      url,
      {
        comentario: this.comForm.value.com,
        id_usuario: id_us,
        id_producto: +this.idp
      },
      { headers: this.headers }
    ).subscribe(data => {this.phComment(data)});

  }

  phComment(obj):void{
    this.comentarios.push(obj);
    this.comForm.setValue({
      com:""
    });
  }

  openmodal():void{
    this.mostrar = true;

  }

  closemodal():void{
    this.mostrar = false;
    this.comp = false;
  }

  getLikes(id):void{
    let e = +id;

    const url = `${base}/likes/${e}`;
    this.http.get<any>(
      url
    ).subscribe(data => { this.setLikes(data)});
  }

  setLikes(dta):void{
    this.l=dta.likes;
    this.d=dta.dislikes;
  }

  denuncia():void{
    let id_us = this._data.id_usuario;
    //producto idp
    //request idus, idp, idcom bay
    const url = base + "/newden";
    this.http.post<any>(
      url,
      {
        comentario: this.denForm.value.den,
        id_usuario: id_us,
        id_producto: +this.idp
      },
      { headers: this.headers }
    ).subscribe(data => {console.log(data)});
    this.comp = true;
    this.mensaje = 'Se ha registrado tu denuncia';
  }

  computar():void{
    if(this.estado == 0){
      this.texto = 'No has votado';
    }

    if(this.estado == 1){
      this.texto = 'Te gusta esto';
    }

    if(this.estado == 2){
      this.texto = 'No te gusta esto';
    }

    //this.getLikes(this.idp);
  }

  like():void{
    if(this.estado==0){
      this.estado = 1;
      this.l++;
      this.n_like('L');
    }else if(this.estado==1){
      this.estado = 0;
      this.l--;
      this.d_like();
    }else if(this.estado==2){
      this.estado = 1;
      this.l++;
      this.d--;
      this.m_like('L');
    }
    this.computar();
  }

  dislike():void{
    if(this.estado==0){
      this.estado = 2;
      this.d++;
      this.n_like('D');
    }else if(this.estado==1){
      this.l--;
      this.d++;
      this.estado = 2;
      this.m_like('D');
    } else if(this.estado==2){
      this.estado = 0;
      this.d--;
      this.d_like();
    }
    this.computar();
  }

  d_like():void{
    let id_us = this._data.id_usuario;
    const url = base + "/dlike";
    this.http.post<any>(
      url,
      {
        id_usuario: id_us,
        id_producto: +this.idp
      },
      { headers: this.headers }
    ).subscribe(data => {console.log(data)});
  }

  m_like(tip):void{
    let id_us = this._data.id_usuario;
    const url = base + "/mlike";
    this.http.post<any>(
      url,
      {
        id_usuario: id_us,
        id_producto: +this.idp,
        tipo: tip
      },
      { headers: this.headers }
    ).subscribe(data => {console.log(data)});
  }

  n_like(tip):void{
    let id_us = +this._data.id_usuario;
    let id_p = +this.idp;

    let e = {
      id_usuario: id_us,
      id_producto: id_p,
      tipo: tip
    };
    console.log(e);
    const url = base + "/nlike";
    this.http.post<any>(
      url,
      e,
      { headers: this.headers }
    ).subscribe(data => {console.log(data)});
  }

  mystatus(id):void{
    let e = +id;

    const url = `${base}/mylike/${this._data.id_usuario}/${e}`;

    this.http.get<any>(
      url
    ).subscribe(data => { this.setStatus(data)});
  }

  setStatus(dta):void{
    this.estado = dta.estado;
    this.computar();
  }

  irChat(id_us_p):void{
    let a = +this._data.id_usuario;
    const url = base + "/ncons";
    this.http.post<any>(
      url,
      {
        id_usuario: a,
        id_vendedor: id_us_p
      },
      { headers: this.headers }
    ).subscribe(data => {this.chrt(data)});
    
  }

  chrt(ee):void{
    this.router.navigate([`/conv/${ee.id}`]);
  }


}
