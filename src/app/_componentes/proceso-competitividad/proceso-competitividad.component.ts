import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-proceso-competitividad',
  templateUrl: './proceso-competitividad.component.html',
  styleUrls: ['./proceso-competitividad.component.css']
})
export class ProcesoCompetitividadComponent implements OnInit {
  loading = false;
  publicaciones: any = [];

  separar = 4;
  start = 0;
  publi_filter: any = [];
  boton_more = true;
  boton_menos = true;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }
  
  public getPublicaciones() {
    this.loading = true;
    this.userService.getPublicaciones().subscribe(
      data => {
        this.publicaciones = data;
        this.loading = false;
        this.loadStart();
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  loadStart() {
    let size = this.publicaciones.length;
    this.start = this.separar;
    if (size <= this.start) {
      for (var i of this.publicaciones) {
        this.publi_filter.push(i);
        
      }
      this.boton_more = false;
      this.boton_menos = false;
    }
    else{
      for (let i = 0; i < this.start; i++) {
        this.publi_filter.push(this.publicaciones[i]);
        
      }
      this.boton_more = true;
      this.boton_menos = false;
    }

    console.log(this.start);
  }

  loadMore(){
    
    let size = this.publicaciones.length;

    this.start = this.start + this.separar;
    console.log(this.start);

    if (this.start < size) {
      for (let i = this.start - this.separar; i < this.start; i++) {
        this.publi_filter.push(this.publicaciones[i]);
        
      }
      this.boton_more = true;
      this.boton_menos = true;
    }
    else{
      for (let i = this.start - this.separar; i < size; i++) {
        this.publi_filter.push(this.publicaciones[i]);
        
      }
      this.boton_more = false;
      this.boton_menos = true;
    }

  }

  loadMenos(){
    
    this.start = this.start - this.separar;

    this.publi_filter = [];

    for (let i = 0; i < this.start; i++) {
      this.publi_filter.push(this.publicaciones[i]);
    }
    this.boton_more = true;
    
    if(this.start <= this.separar){
      this.boton_menos = false;
    }

  }
}
