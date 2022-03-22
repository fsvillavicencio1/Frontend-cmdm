import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.css']
})
export class UpdateEmpresaComponent implements OnInit {
  loading = false;
  microempresa: any = {};
  actividades: any = [];

  form_empresa: any = {
    empresa: null,
    ruc: null,
    mision: null,
    vision: null,
    actividad: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;
  selectedFiles!: FileList;
  currentFile!: File;
  imagen = "";
  actividadOk: any = [];

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public d: any) { }

  ngOnInit(): void {
    console.log(this.d.id);
    this.getMicroempresa();
  }

  public getMicroempresa(){
    this.loading = true;
    this.userService.getEmpresaId(this.d.id).subscribe(
      data => {
        this.getActividades();
        this.microempresa = data;
        this.form_empresa.empresa = data.empresa;
        this.form_empresa.ruc = data.ruc;
        this.form_empresa.mision = data.mision;
        this.form_empresa.vision = data.vision;
        this.form_empresa.actividad = data.actividad[0].actividad;
      },
      err => {
        alert("No se pueden conseguir los datos");
        this.loading = false;
      }
    );
  }

  public getActividades(){
    this.loading = true;
    this.userService.getActividad().subscribe(
      data => {
        this.actividades = data;
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
    const { empresa, ruc, mision, vision, actividad } = this.form_empresa;
    this.actividadOk.push(actividad);

    if (empresa == this.microempresa.empresa) {
      this.userService.updateEmpresaDetalles(this.microempresa.id, empresa, ruc, mision, vision, imagen, this.actividadOk).subscribe(
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

    else {
      this.userService.updateEmpresa(this.microempresa.id, empresa, ruc, mision, vision, imagen, this.actividadOk).subscribe(
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
  }


  onChange(event: any) {
    this.selectedFiles = event.target.files;
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;
    }
  }

}
