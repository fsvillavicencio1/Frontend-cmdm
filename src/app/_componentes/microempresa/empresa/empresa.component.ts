import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { AuthService } from '../../../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmpresaComponent } from '../update-empresa/update-empresa.component';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  actividades: any = [];
  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  empresa: any = {};
  form_empresa: any = {
    empresa: null,
    ruc: null,
    mision: null,
    vision: null,
    actividad: null
  };
  isSuccessful_empresa = false;
  isSignUpFailed_empresa = false;
  errorMessage_empresa = '';
  loading_empresa = false;
  usernameOk: any = [];
  actividadOk: any = []


  selectedFiles!: FileList;
  currentFile!: File;
  url = "";

  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private authService: AuthService, public dialogUpdate: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
      this.usernameOk = [user.username];
      console.log(this.id_user);
      this.getExistEmpresa();
      this.getActividades();
    }
  }

  public getActividades(){
    this.userService.getActividad().subscribe(
      data => {
        this.actividades = data;
      },
      err => {
        console.log(err);
      }
    );
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
          this.loading = false;
        }
      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }

  onSubmitEmpresa(): void {
    this.loading_empresa = true;
    this.userService.cargarImagen(this.currentFile).subscribe(
      data => {
        this.url = data;
        this.cargarEmpresa(this.url);
      },
      err => {
        this.errorMessage_empresa = err;
        this.isSignUpFailed_empresa = true;
        this.loading_empresa = false;
      }
    );
  }

  cargarEmpresa(imagen: string){
    const { empresa, ruc, mision, vision, actividad } = this.form_empresa;
    this.actividadOk.push(actividad);
    this.authService.registerEmpresa(empresa, ruc, mision, vision, imagen, this.usernameOk, this.actividadOk).subscribe(
      data => {
        console.log(data);
        this.isSuccessful_empresa = true;
        this.isSignUpFailed_empresa = false;
        this.loading_empresa = false;
        this.ngOnInit();
      },
      err => {
        this.errorMessage_empresa = err.error.message;
        this.isSignUpFailed_empresa = true;
        this.loading_empresa = false;
      }
    );
  }

  onChange(event: any) {
    this.selectedFiles = event.target.files;
    const file: File | null = this.selectedFiles.item(0);
    if(file){
      this.currentFile = file;
    }
  }

  openDialogUpdate(){
    const dialogRef = this.dialogUpdate.open(UpdateEmpresaComponent, { data: { id: this.empresa[0].id }, disableClose: true});
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
  }

}
