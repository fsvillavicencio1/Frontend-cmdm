import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delete-publicacion',
  templateUrl: './delete-publicacion.component.html',
  styleUrls: ['./delete-publicacion.component.css']
})
export class DeletePublicacionComponent implements OnInit {
  loading = false;
  publicacion: any = {};
  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPublicacion();
  }

  public getPublicacion() {
    this.loading = true;
    this.userService.getPublicacionesId(this.data.id).subscribe(
      data => {
        this.publicacion = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  deletePublicacion(){
    this.loading2 = true;
    this.userService.deletePublicacion(this.data.id).subscribe(
      data => {
        this.loading2 = false;
        this.isSuccessful = true;
      },
      err =>{
        console.log(err);
        this.isSignUpFailed = true;
        this.isSuccessful = false;
      }
    );
  }

}
