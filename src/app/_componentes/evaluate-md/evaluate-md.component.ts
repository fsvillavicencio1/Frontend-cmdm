import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-evaluate-md',
  templateUrl: './evaluate-md.component.html',
  styleUrls: ['./evaluate-md.component.css']
})
export class EvaluateMdComponent implements OnInit {
  evaluacion = "https://survey123.arcgis.com/share/5ef8ddfd34af4aea89e54f513e6ad51b";
  trustedDashboardUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.evaluacion + "?hide=navbar"
    );
  }

}
