import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/Actividad';
import { MatDialog } from '@angular/material/dialog';
import { RegisterActividadComponent } from '../actividades_micro/register-actividad/register-actividad.component';
import { UpdateActividadComponent } from '../actividades_micro/update-actividad/update-actividad.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  isLoggedIn = false;
  id_user?: number;
  loading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  private roles: string[] = [];
  showAdminBoard = false;

  ELEMENT_DATA: Actividad[] = [];
  displayedColumns: string[] = ['actividad', 'opciones'];
  dataSource = new MatTableDataSource<Actividad>(this.ELEMENT_DATA);

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService
    , public dialogRegister: MatDialog
    , public dialogUpdate: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.id_user = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.getAllActividades();
    }
    
  }

  public getAllActividades(){
    this.loading = true;
    /*let resp = this.userService.getActividad();
    resp.subscribe(
      report => {
        this.dataSource.data = report as Actividad[];
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );*/
  }

  openDialogRegister(){
    const dialogRef = this.dialogRegister.open(RegisterActividadComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
  }

  openDialogUpdate(id: number){
    const dialogRef = this.dialogUpdate.open(UpdateActividadComponent, { data: {id: id}, disableClose: true });
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
  }

}
