import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  constructor(private titulo_page:Title) {
    titulo_page.setTitle('Evalúate')
  }

  ngOnInit(): void {
  }

}
