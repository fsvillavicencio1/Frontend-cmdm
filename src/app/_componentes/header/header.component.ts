import { Component, OnInit, Input } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() imagen: string = '';
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  
  }
}
