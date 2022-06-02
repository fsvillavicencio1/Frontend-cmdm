import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Publicacion } from 'src/Publicacion';
import { MatTableDataSource } from '@angular/material/table';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { ViewPublicacionComponent } from '../publicaciones/view-publicacion/view-publicacion.component';
import { UpdatePublicacionComponent } from '../publicaciones/update-publicacion/update-publicacion.component';
import { DeletePublicacionComponent } from '../publicaciones/delete-publicacion/delete-publicacion.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-competitividad',
  templateUrl: './competitividad.component.html',
  styleUrls: ['./competitividad.component.css']
})
export class CompetitividadComponent implements OnInit {

  isLoggedIn = false;
  id_user?: number;
  loading = false;
  username = '';

  boton_add = true;
  create_post = true;

  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';

  mode: ProgressSpinnerMode = 'indeterminate';

  private roles: string[] = [];
  showAdminBoard = false;

  ELEMENT_DATA: Publicacion[] = [];
  displayedColumns: string[] = ['titulo', 'opciones'];
  dataSource = new MatTableDataSource<Publicacion>(this.ELEMENT_DATA);
  
  public Editor = ClassicEditorBuild;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  form: any = {
    titulo: null,
    descripcion: null
  };

  selectedFiles!: FileList;
  currentFile!: File;
  url = "";

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(private tokenStorageService: TokenStorageService, 
    private userService: UserService,
    public dialogRegister: MatDialog,
    public dialogUpdate: MatDialog,
    public dialogDelete: MatDialog) { }

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.id_user = user.id;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      console.log(this.username);
      this.getAllPublicaciones();
    }
  }

  public getAllPublicaciones(){
    this.removePublicacion();
    this.loading = true;
    let resp = this.userService.getPublicaciones();
    resp.subscribe(
      report => {
        this.dataSource.data = report as Publicacion[];
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  public addPublicacion(){
    this.boton_add = false;
    this.create_post = true;
  }

  public removePublicacion(){
    this.boton_add = true;
    this.create_post = false;
  }


  onSubmit(): void {
    this.loading2 = true;
    this.userService.cargarImagen(this.currentFile).subscribe(
      data => {
        this.url = data;
        this.cargarPublicacion(this.url);
      },
      err => {
        this.errorMessage = err;
        this.isSignUpFailed = true;
        this.loading2 = false;
      }
    );
  }

  cargarPublicacion(imagen: string){
    const { titulo, descripcion } = this.form;
    
    this.userService.registerPublicacion(this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss')!, titulo, descripcion.toString() , imagen, this.username).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading2 = false;
        this.ngOnInit();
        this.form.titulo = '';
        this.form.descripcion = '';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.loading2 = false;
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

  openDialogView(id: number){
    const dialogRef = this.dialogRegister.open(ViewPublicacionComponent, {data: {id: id}});
  }

  openDialogUpdate(id: number){
    const dialogRef = this.dialogUpdate.open(UpdatePublicacionComponent, {data: {id: id}, disableClose: true});
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});

  }

  openDialogDelete(id: number){
    const dialogRef = this.dialogDelete.open(DeletePublicacionComponent, {data: {id: id}, disableClose: true});
    dialogRef.afterClosed().subscribe(() => {this.ngOnInit();});
  }
}
