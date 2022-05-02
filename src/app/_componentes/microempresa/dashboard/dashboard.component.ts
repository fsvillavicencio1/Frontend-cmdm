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
  isEvaluado = false;
  empresa: any = {};
  trustedDashboardUrl?: SafeUrl;

  cadena = "https://app.powerbi.com/reportEmbed?reportId=0335a70b-d55a-4e18-86a0-26cbd205829f&autoAuth=true&ctid=6eeb49aa-436d-43e6-becd-bbdf79e5077d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWNlbnRyYWwtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D";

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
          this.isEvaluado = this.empresa[0].evaluado;
          this.loading = false;

          this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.cadena
            + "&filter=CMVIEW/empresa eq '" + this.empresa[0].empresa + "'");
        }
      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }

}
