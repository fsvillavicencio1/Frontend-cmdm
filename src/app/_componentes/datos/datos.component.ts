import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(private titulo_page:Title) {
    titulo_page.setTitle('Datos')
  }

  ngOnInit(): void {
  }

}
