import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-compe-digital',
  templateUrl: './compe-digital.component.html',
  styleUrls: ['./compe-digital.component.css']
})
export class CompeDigitalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
