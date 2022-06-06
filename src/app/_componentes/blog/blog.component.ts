import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { UserService } from 'src/app/_services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  titulo = 'Blog';
  imagen = '../../../assets/Blog/header.jpg';

  loading = false;
  publicaciones: any = [];
  ultima_publicacion: any = {};
  resto_publicaciones: any = [];
  texto_resumido_ultima = '';

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    AOS.init();
    this.getPublicaciones();
  }

  public getPublicaciones() {
    this.loading = true;
    this.userService.getPublicaciones().subscribe(
      data => {
        this.publicaciones = data;
        this.ultima_publicacion = this.publicaciones[0];
        this.texto_resumido_ultima = this.ultima_publicacion.descripcion.substr(0, 170) + "....";
        for (let index = 1; index < this.publicaciones.length; index++) {
          this.resto_publicaciones.push(this.publicaciones[index])
        }
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  public recortar_texto(texto: string){
    return texto.substr(0, 120) + "....";
  }

}
