import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  titulo = 'Proyecto';
  imagen = '../../../assets/Proyecto/proyecto.jpg';
  
  titulo_parallax = 'La planificación, la tecnología e innovación tiene un papel importante en la gestión empresarial a nivel mundial, convirtiéndose en instrumentos fundamentales para que las empresas sean eficaces, eficientes y competitivas.';
  imagen_parallax = '../../../assets/Parallax/fondo7.jpg';

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
