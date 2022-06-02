import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-actividad',
  templateUrl: './delete-actividad.component.html',
  styleUrls: ['./delete-actividad.component.css']
})
export class DeleteActividadComponent implements OnInit {
  loading = false;
  actividad: any = {};
  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getActividad();
  }

  public getActividad() {
    this.loading = true;
    this.userService.getActividadId(this.data.id).subscribe(
      data => {
        this.actividad = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  deleteActividad(){
    this.loading2 = true;
    this.userService.deleteActividad(this.data.id).subscribe(
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
