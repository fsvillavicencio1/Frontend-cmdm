import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  isEvaluado = false;
  empresa: any = {};

  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMicroBoard = this.roles.includes('ROLE_MICRO');
      console.log(this.id_user);
      this.getExistEmpresa();
    }
  }

  public getExistEmpresa(){
    this.loading = true;
    this.userService.getEmpresa(this.id_user!).subscribe(
      data => {
        if (Object.keys(data).length == 0){
          this.isEmpresa = false;
          this.loading = false;
        }
        else{
          this.isEmpresa = true;
          this.empresa = data;
          this.isEvaluado = this.empresa[0].evaluado;
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
