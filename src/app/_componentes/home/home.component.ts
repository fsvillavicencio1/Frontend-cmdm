import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '../carousel/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  
  titulo = 'Para las empresas la transformación digital es un paso fundamental que les permitirá mantenerse en el mercado y seguir creciendo de forma sostenida.';
  imagen = '../../../assets/Parallax/parallax-home.jpg';

  constructor(private titulo_page:Title) {
    titulo_page.setTitle('Digicom')
  }

  ngOnInit(): void {
  }

}
