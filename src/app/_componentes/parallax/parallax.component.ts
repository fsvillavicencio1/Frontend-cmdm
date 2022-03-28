import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from './ng2-parallaxscroll';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css']
})
export class ParallaxComponent implements OnInit {
  public config: IParallaxScrollConfig = {
    axis: 'Y',
    speed: 1
  };
  constructor() { }

  ngOnInit(): void {
  }

}
