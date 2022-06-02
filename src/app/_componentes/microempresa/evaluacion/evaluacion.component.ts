import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

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
  trustedDashboardUrl?: SafeUrl;
  user?: any;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;

  cadena = "//survey123.arcgis.com/share/330866db6b3541a59b4108e63e663bbd";

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.id_user = this.user.id;
      console.log(this.id_user);
      this.roles = this.user.roles;
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
            + "?field:razon_social=" + this.empresa[0].razonSocial
            + "&field:ruc=" + this.empresa[0].ruc
            + "&field:direccion=" + this.empresa[0].direccion
            + "&field:telefono=" + this.empresa[0].telefono
            + "&field:correo=" + this.empresa[0].correo
            + "&field:pagina_web=" + this.empresa[0].paginaWeb
            + "&field:empleados_hombres=" + this.empresa[0].empleadosHombres
            + "&field:empleados_mujeres=" + this.empresa[0].empleadosMujeres
            + "&field:tipo_microempresa=" + this.empresa[0].tipo
            + "&field:pertenece_a_asociacion=" + this.empresa[0].perteneceAsociacion
            + "&field:quirere_pertenecer_a_asociacion=" + this.empresa[0].quiereAsociacion
            + "&field:provincia=" + this.empresa[0].provincia
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