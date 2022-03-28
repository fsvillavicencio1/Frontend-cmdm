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
  actividades: any = [];
  form: any = {
    nombres: null,
    apellidos: null,
    email: null,
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

  selectedFiles!: FileList;
  currentFile!: File;
  url = "";

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private authService: AuthService, private userService: UserService) { }

  
  ngOnInit(): void {
    this.getActividades();
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

  
  onSubmit(): void {
    this.loading = true;
    const { nombres, apellidos, email, username, password } = this.form;
    this.authService.registerUser(nombres, apellidos, email, username, password).subscribe(
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
}
