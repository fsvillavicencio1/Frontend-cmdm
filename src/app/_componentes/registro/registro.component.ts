import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from '../../_services/auth.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipos: any = [];
  actividades: any = [];

  form: any = {
    nombres: null,
    apellidos: null,
    //email: null,
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading = false;
  usernameOk: any = [];
  actividadOk: any = [];

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

  imagen = false;
  imagen_defecto = "https://adlsutpl.blob.core.windows.net/imagen-microempresas/man-giving-business-presentation-using-high-technology-digital-pen.jpg";

  selectedFiles!: FileList;
  currentFile!: File;
  url = "";

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  pertenece = ["Si", "No"]
  provincias = ["Azuay","Bolívar","Cañar","Carchi","Chimborazo","Cotopaxi","El Oro",
  "Esmeraldas","Galápagos","Guayas","Imbabura","Loja","Los Ríos",
  "Manabí","Morona Santiago","Napo","Orellana",
  "Pastaza","Pichincha","Santa Elena","Santo Domingo",
  "Sucumbíos","Tungurahua","Zamora Chinchipe"];

  constructor(private authService: AuthService, private userService: UserService) { }

  
  ngOnInit(): void {
    this.getTipos();
    this.getActividades();
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

  onSubmit(): void {
    this.loading = true;
    const { nombres, apellidos, username, password } = this.form;
    this.authService.registerUser(nombres, apellidos, username, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
        this.usernameOk = [data.username];
        console.log(this.usernameOk);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
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
    
    this.authService.registerEmpresa(razonSocial, ruc, direccion, telefono, correo, paginaWeb, parseInt(empleadosHombres), parseInt(empleadosMujeres), tipo, actividad, perteneceAsociacion, quiereAsociacion, provincia, imagen, this.usernameOk).subscribe(
      data => {
        console.log(data);
        this.isSuccessful_empresa = true;
        this.isSignUpFailed_empresa = false;
        this.loading_empresa = false;
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
}
