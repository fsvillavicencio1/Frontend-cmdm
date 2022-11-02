import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-evaluate-competitividad',
  templateUrl: './evaluate-competitividad.component.html',
  styleUrls: ['./evaluate-competitividad.component.css']
})
export class EvaluateCompetitividadComponent implements OnInit {
  evaluacion = "https://survey123.arcgis.com/share/794d0a6f13d94181988fe20a5a31d561";
  trustedDashboardUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.evaluacion + "?hide=navbar"
    );
  }

}
