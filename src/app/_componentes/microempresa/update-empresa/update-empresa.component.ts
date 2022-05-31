import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.css']
})
export class UpdateEmpresaComponent implements OnInit {
  loading = false;
  microempresa: any = {};
  tipos: any = [];

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
    subactividad: null,
    perteneceAsociacion: null,
    quiereAsociacion: null,
    provincia: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;
  selectedFiles!: FileList;
  currentFile!: File;
  imagen = "";
  actividadOk: any = [];

  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';


  pertenece = ["Si", "No"]
  provincias = ["Azuay","Bolívar","Cañar","Carchi","Chimborazo","Cotopaxi","El Oro",
  "Esmeraldas","Galápagos","Guayas","Imbabura","Loja","Los Ríos",
  "Manabí","Morona Santiago","Napo","Orellana",
  "Pastaza","Pichincha","Santa Elena","Santo Domingo",
  "Sucumbíos","Tungurahua","Zamora Chinchipe"];

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public d: any) { }

  ngOnInit(): void {
    console.log(this.d.id);
    this.getMicroempresa();
  }

  public getMicroempresa() {
    this.loading = true;
    this.userService.getEmpresaId(this.d.id).subscribe(
      data => {
        this.getTipos();
        this.microempresa = data;
        this.form_empresa.razonSocial = data.razonSocial;
        this.form_empresa.ruc = data.ruc;
        this.form_empresa.direccion = data.direccion;
        this.form_empresa.telefono = data.telefono;
        this.form_empresa.correo = data.correo;
        this.form_empresa.paginaWeb = data.paginaWeb;
        this.form_empresa.empleadosHombres = data.empleadosHombres;
        this.form_empresa.empleadosMujeres = data.empleadosMujeres;
        this.form_empresa.tipo = data.tipo;
        this.form_empresa.actividad = data.actividad;
        this.form_empresa.subactividad = data.subactividad;
        this.form_empresa.perteneceAsociacion = data.perteneceAsociacion;
        this.form_empresa.quiereAsociacion = data.quiereAsociacion;
        this.form_empresa.provincia = data.provincia;

      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }

  public getTipos() {
    this.loading = true;
    this.userService.getTipos().subscribe(
      data => {
        this.tipos = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.loading2 = true;
    if (this.currentFile != null) {
      this.userService.cargarImagen(this.currentFile).subscribe(
        data => {
          this.imagen = data;
          this.cargarMicroempresa(this.imagen);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;
        }
      );
    }

    else {
      this.imagen = this.microempresa.imagen;
      this.cargarMicroempresa(this.imagen);
    }

  }

  cargarMicroempresa(imagen: string) {
    const { razonSocial, ruc, direccion, telefono, correo, 
      paginaWeb, empleadosHombres, empleadosMujeres, tipo, 
      actividad, subactividad, perteneceAsociacion, quiereAsociacion, provincia} = this.form_empresa;
    //this.actividadOk.push(actividad);

    if (razonSocial == this.microempresa.razonSocial && ruc == this.microempresa.ruc) {
      this.userService.updateEmpresaDetalles(this.microempresa.id, razonSocial, ruc, direccion, telefono, correo, paginaWeb, parseInt(empleadosHombres), parseInt(empleadosMujeres), tipo, actividad, subactividad, perteneceAsociacion, quiereAsociacion, provincia,imagen).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loading2 = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;

        }
      );
    }

    if(razonSocial != this.microempresa.razonSocial){
      this.userService.updateEmpresaNombre(this.microempresa.id, razonSocial, ruc, direccion, telefono, correo, paginaWeb, parseInt(empleadosHombres), parseInt(empleadosMujeres), tipo, actividad, subactividad, perteneceAsociacion, quiereAsociacion, provincia,imagen).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loading2 = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;

        }
      );
    }

    if(ruc != this.microempresa.ruc){
      this.userService.updateEmpresaRuc(this.microempresa.id, razonSocial, ruc, direccion, telefono, correo, paginaWeb, parseInt(empleadosHombres), parseInt(empleadosMujeres), tipo, actividad, subactividad, perteneceAsociacion, quiereAsociacion, provincia,imagen).subscribe(
        data => {
          /*this.userService.updateEmpresaRUC_JSON(this.microempresa.ruc, ruc).subscribe(
            data => {
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              this.loading2 = false;
              console.log(this.microempresa.ruc, ruc);
            },
            err => {
              this.errorMessage = err.error.message;
              this.isSignUpFailed = true;
              this.loading2 = false;
    
            }
          )*/
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loading2 = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;

        }
      );
    }

    /*else {
      this.userService.updateEmpresa(this.microempresa.id, empresa, ruc, mision, vision, imagen, this.actividadOk).subscribe(
        data => {

          this.userService.updateEmpresaJSON(this.microempresa.empresa, empresa).subscribe(
            data => {
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              this.loading2 = false;
              console.log(this.microempresa.empresa, empresa);
            },
            err => {
              this.errorMessage = err.error.message;
              this.isSignUpFailed = true;
              this.loading2 = false;
    
            }
          )
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;

        }
      );
    }*/
  }


  onChange(event: any) {
    this.selectedFiles = event.target.files;
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;
    }
  }

}

