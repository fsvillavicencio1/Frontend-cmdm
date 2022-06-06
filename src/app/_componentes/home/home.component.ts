import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '../carousel/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  
  titulo = 'No hay que perder de vista que cualquier empresa competitiva deberá ofrecer calidad, fiabilidad, rapidez y flexibilidad a la vez que rentabilidad.';
  imagen = '../../../assets/Parallax/parallax-home.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
