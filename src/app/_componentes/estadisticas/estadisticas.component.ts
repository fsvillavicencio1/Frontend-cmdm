import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faJetFighter } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  loading = false;
  estadisticas: any = {};

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  faRocket = faBriefcase;
  faChartLine = faJetFighter;
  faLayerGroup = faLayerGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getEstadisticas();
  }

  public getEstadisticas() {
    this.loading = true;
    this.userService.getEstadisticas().subscribe(
      data => {
        this.estadisticas = data;
        this.loading = false;
        console.log(this.estadisticas)
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
