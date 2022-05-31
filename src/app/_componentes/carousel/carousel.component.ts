import { Component, OnInit, Input } from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';
import * as AOS from 'aos';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  /*Propiedades*/
  @Input() height = 606;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];

  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(public dialog: MatDialog) {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
    this.items = [];
  }

  ngOnInit(): void {
    AOS.init();
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  openDialog() {
    this.dialog.open(LoginComponent, { panelClass: 'app-full-bleed-dialog' });
  }

  abrirLink(url: string) {
    window.open(url, "_blank");
  }

}
