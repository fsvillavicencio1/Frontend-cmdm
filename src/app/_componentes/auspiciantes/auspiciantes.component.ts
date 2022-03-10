import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-auspiciantes',
  templateUrl: './auspiciantes.component.html',
  styleUrls: ['./auspiciantes.component.css']
})
export class AuspiciantesComponent implements OnInit {

  customOptions: any = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
