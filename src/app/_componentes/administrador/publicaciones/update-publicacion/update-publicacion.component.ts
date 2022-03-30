import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-publicacion',
  templateUrl: './update-publicacion.component.html',
  styleUrls: ['./update-publicacion.component.css']
})
export class UpdatePublicacionComponent implements OnInit {
  loading = false;
  form: any = {
    titulo: null,
    descripcion: null
  };
  publicacion: any = {};

  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;
  selectedFiles!: FileList;
  currentFile!: File;
  imagen = "";

  public Editor = ClassicEditorBuild;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPublicacion();
  }

  public getPublicacion() {
    this.loading = true;
    this.userService.getPublicacionesId(this.data.id).subscribe(
      data => {
        this.publicacion = data;
        this.form.titulo = data.titulo;
        this.form.descripcion = data.descripcion;
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
          this.cargarPublicacion(this.imagen);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.loading2 = false;
        }
      );
    }

    else {
      this.imagen = this.publicacion.imagen;
      this.cargarPublicacion(this.imagen);
    }

  }

  cargarPublicacion(imagen: string) {
    const { titulo, descripcion } = this.form;

    if (titulo == this.publicacion.titulo) {
      this.userService.updatePublicacionDetalles(this.publicacion.id, titulo, descripcion, imagen).subscribe(
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
      this.userService.updatePublicacion(this.publicacion.id, titulo, descripcion, imagen).subscribe(
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
