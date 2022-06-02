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
  tipos: any = [];
  actividades: any = [];

  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  empresa: any = {};
  form_empresa: any = {
    razonSocial: null,
    ruc: null,
    direccion: null,
    telefono: null,
    correo: null,
    paginaWeb: null,
    empleadosHombres: null,
    empleadosMujeres: null,
    tipo: null,
    actividad: null,
    perteneceAsociacion: null,
    quiereAsociacion: null,
    provincia: null
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

  private roles: string[] = [];
  showAdminBoard = false;
  showMicroBoard = false;

  imagen = false;
  imagen_defecto = "https://adlsutpl.blob.core.windows.net/imagen-microempresas/man-giving-business-presentation-using-high-technology-digital-pen.jpg";

  pertenece = ["Si", "No"]
  provincias = ["Azuay","Bolívar","Cañar","Carchi","Chimborazo","Cotopaxi","El Oro",
  "Esmeraldas","Galápagos","Guayas","Imbabura","Loja","Los Ríos",
  "Manabí","Morona Santiago","Napo","Orellana",
  "Pastaza","Pichincha","Santa Elena","Santo Domingo",
  "Sucumbíos","Tungurahua","Zamora Chinchipe"];

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private authService: AuthService, public dialogUpdate: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
      this.usernameOk = [user.username];
      console.log(this.id_user);
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMicroBoard = this.roles.includes('ROLE_MICRO');
      this.getExistEmpresa();
      this.getTipos();
      this.getActividades();
    }
  }

  public getTipos(){
    this.userService.getTipos().subscribe(
      data => {
        this.tipos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  public getActividades(){
    this.userService.getActividades().subscribe(
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
    if(this.imagen == true){
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
    else{
      this.cargarEmpresa(this.imagen_defecto);
    }
  }

  cargarEmpresa(imagen: string){
    const { razonSocial, ruc, direccion, telefono, correo, 
      paginaWeb, empleadosHombres, empleadosMujeres, tipo, 
      actividad, perteneceAsociacion, quiereAsociacion, provincia} = this.form_empresa;
    //this.actividadOk.push(actividad);
    this.authService.registerEmpresa(razonSocial, ruc, direccion, telefono, correo, paginaWeb, parseInt(empleadosHombres), parseInt(empleadosMujeres), tipo, actividad, perteneceAsociacion, quiereAsociacion, provincia, imagen, this.usernameOk).subscribe(
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
      this.imagen = true;
    }
    else{
      this.imagen = false;

    }
  }

  openDialogUpdate(){
    const dialogRef = this.dialogUpdate.open(UpdateEmpresaComponent, { data: { id: this.empresa[0].id }, disableClose: true});
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
  }

}
