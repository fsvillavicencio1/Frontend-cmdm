import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-proyecto-competitividad',
  templateUrl: './proyecto-competitividad.component.html',
  styleUrls: ['./proyecto-competitividad.component.css']
})
export class ProyectoCompetitividadComponent implements OnInit {
  titulo = 'Competitividad del sector microempresarial';
  imagen = '../../../assets/Competitividad/header.jpg';

  titulo_parallax = "La competitividad empresarial permitirá a una empresa mantenerse en pie y alcanzar los objetivos que se proponga.";
  imagen_parallax = '../../../assets/Competitividad/header.jpg';
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
