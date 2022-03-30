import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  empresa: any = {};
  trustedDashboardUrl? : SafeUrl;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;

  cadena = "//survey123.arcgis.com/share/dd498dbccd344e6fa27c45c062e53ec0";

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
      console.log(this.id_user);
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMicroBoard = this.roles.includes('ROLE_MICRO');
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
          this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.cadena 
            + "?field:_11_raz_n_social=" + this.empresa[0].empresa 
            + "&field:_12_ruc=" + this.empresa[0].ruc
            + "&hide=navbar"
            + "&autoRefresh=3");
          this.loading = false;

        }
      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }



}