import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { base } from '../../keys/con';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public http: HttpClient, private cdr: ChangeDetectorRef) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  catForm = new FormGroup({
    cat: new FormControl('')
  });

  categorias: any = [];

  ngOnInit(): void {
    this.requestCategories();
  }

  onSubmit():void{
    //registra la cat
    const url = base + "/addcat";
    this.http.post<any>(
      url,
      {
        cat: this.catForm.value.cat,

      },
      { headers: this.headers }
    ).subscribe(data => {console.log(data); this.procdata(data)});
  }

  procdata(dat):void{
    if(dat.status=='yes'){
      this.categorias.push({
        ID_CATEGORIA: dat.id,
        NOMBRE: this.catForm.value.cat
      });
    }
  }


  public requestCategories():void{
    //console.log("yes");
    const url = base + "/getcategories";
    this.http.get<any>(
      url
    ).subscribe(data => { this.categorias=data; this.cdr.detectChanges();});
    
  }

}
