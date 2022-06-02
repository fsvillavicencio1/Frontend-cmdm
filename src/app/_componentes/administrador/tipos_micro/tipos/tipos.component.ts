import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Tipo } from 'src/Tipo';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterTipoComponent } from '../register-tipo/register-tipo.component';
import { UpdateTipoComponent } from '../update-tipo/update-tipo.component';
import { DeleteTipoComponent } from '../delete-tipo/delete-tipo.component';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {
  isLoggedIn = false;
  id_user?: number;
  loading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  private roles: string[] = [];
  showAdminBoard = false;

  ELEMENT_DATA: Tipo[] = [];
  displayedColumns: string[] = ['tipo', 'opciones'];
  dataSource = new MatTableDataSource<Tipo>(this.ELEMENT_DATA);

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService
    , public dialogRegister: MatDialog
    , public dialogUpdate: MatDialog
    , public dialogDelete: MatDialog) { }

    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        this.id_user = user.id;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.getAllTipos();
      }
      
    }

    public getAllTipos(){
      this.loading = true;
      let resp = this.userService.getTipos();
      resp.subscribe(
        report => {
          this.dataSource.data = report as Tipo[];
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
    }

    openDialogRegister(){
      const dialogRef = this.dialogRegister.open(RegisterTipoComponent, { disableClose: true });
      dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
    }
  
    openDialogUpdate(id: number){
      const dialogRef = this.dialogUpdate.open(UpdateTipoComponent, { data: {id: id}, disableClose: true });
      dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
    }
  
    openDialogDelete(id: number){
      const dialogRef = this.dialogDelete.open(DeleteTipoComponent, {data: {id: id}, disableClose: true});
      dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
    }

}
