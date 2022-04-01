import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  publi?: { titulo: string};
  loading = false;
  publicacion: any = {};
  publicaciones: any = [];
  publi_filter: any = [];

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  loading2 = false;

  constructor(private rutaActiva: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
  
    this.publi = {
      titulo: this.rutaActiva.snapshot.params?.['nombre'],
    };
    this.init(this.publi!.titulo);
  }

  public init(titulo: string){
    this.getPublicacion(titulo);
  }

  public getPublicacion(titulo: String){
    this.loading = true;
    this.loading2 = true;
    this.userService.getPublicacionNombre(titulo).subscribe(
      data => {
        this.publicacion = data;
        this.loading = false;
        this.getPublicaciones(titulo);
        console.log(this.publicacion);
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  public getPublicaciones(titulo: String){
    this.loading2 = true;
    this.userService.getPublicaciones().subscribe(
      data => {
        this.publicaciones = data;
        this.loading2 = false;
        this.filterPublicaciones(titulo);
      },
      err => {
        console.log(err);
        this.loading2 = false;
      }
    );
  }

  public filterPublicaciones(titulo: String){
    let size = this.publicaciones.length;
    this.publi_filter = [];
    if(size <= 5){
      for (var i of this.publicaciones) {
        if(i.titulo != titulo){
          this.publi_filter.push(i);
        }
      }
    }
    else{
      for (let i = 0; i < 5; i++) {
        if(this.publicaciones[i].titulo != titulo){
        this.publi_filter.push(this.publicaciones[i]);
        }
      }
    }
  }

  public reload(titulo: string){
    this.init(titulo);
  }

}
