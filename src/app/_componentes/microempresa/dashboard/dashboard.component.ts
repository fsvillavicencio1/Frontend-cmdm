import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  isEvaluadoCompetitividad = false;
  isEvaluadoMadurez = false;
  empresa: any = {};
  trustedDashboardUrlCompetitividad?: SafeUrl;
  trustedDashboardUrlMadurez?: SafeUrl;


  cadena_competitividad = "https://app.powerbi.com/reportEmbed?reportId=557912c7-40f9-4f62-aaf9-2ed74d3e6d47&autoAuth=true&ctid=6eeb49aa-436d-43e6-becd-bbdf79e5077d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false";
  cadena_madurez = "https://app.powerbi.com/reportEmbed?reportId=073c3f47-4a6e-4c2d-86e3-170a3e590d51&autoAuth=true&ctid=6eeb49aa-436d-43e6-becd-bbdf79e5077d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false";

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;
  
  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.id_user = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMicroBoard = this.roles.includes('ROLE_MICRO');
      console.log(this.id_user);
      this.getExistEmpresa();
    }
  }

  public getExistEmpresa() {
    this.loading = true;
    this.userService.getEmpresa(this.id_user!).subscribe(
      data => {
        if (Object.keys(data).length == 0) {
          this.isEmpresa = false;
          this.loading = false;
        }
        else {
          this.isEmpresa = true;
          this.empresa = data;
          this.isEvaluadoCompetitividad = this.empresa[0].evaluadoCompetitividad;
          this.isEvaluadoMadurez = this.empresa[0].evaluadoMadurez;
          this.loading = false;

          this.trustedDashboardUrlCompetitividad = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.cadena_competitividad
            + "&filter=CMD_EmpresasActual/ruc eq '" + this.empresa[0].ruc + "'");

          this.trustedDashboardUrlMadurez = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.cadena_madurez
            + "&filter=CMD_EmpresasActual/ruc eq '" + this.empresa[0].ruc + "'");
        }
      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }

}
