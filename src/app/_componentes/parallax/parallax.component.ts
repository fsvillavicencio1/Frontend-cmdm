import { Component, OnInit, Input } from '@angular/core';
import { IParallaxScrollConfig } from './ng2-parallaxscroll';
import * as AOS from 'aos';

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

  @Input() titulo: string = '';
  @Input() imagen: string = '';
  
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
