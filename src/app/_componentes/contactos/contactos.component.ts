import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  titulo = 'Contactos';
  imagen = '../../../assets/Contactos/contactos.jpg';

  faRocket = faRocket;
  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faClock = faClock;

  constructor(private titulo_page:Title) {
    titulo_page.setTitle('Contactos')
  }

  ngOnInit(): void {
    AOS.init();
  }

}
