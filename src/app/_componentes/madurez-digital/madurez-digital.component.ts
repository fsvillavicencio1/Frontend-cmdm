import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-madurez-digital',
  templateUrl: './madurez-digital.component.html',
  styleUrls: ['./madurez-digital.component.css']
})
export class MadurezDigitalComponent implements OnInit {
  titulo = 'Madurez digital del sector microempresarial';
  imagen = '../../../assets/Madurez/header.jpg';

  titulo_parallax = 'Toda empresa que quiera integrarse en el dinámico sistema económico actual y seguir siendo competitiva debe aplicar el pensamiento digital en todos sus procesos';
  imagen_parallax = '../../../assets/Madurez/header.jpg';

  constructor(private titulo_page:Title) {
    titulo_page.setTitle('Madurez digital')
  }

  ngOnInit(): void {
    AOS.init();
  }

}
