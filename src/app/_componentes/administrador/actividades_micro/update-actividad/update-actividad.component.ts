import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-actividad',
  templateUrl: './update-actividad.component.html',
  styleUrls: ['./update-actividad.component.css']
})
export class UpdateActividadComponent implements OnInit {
  loading = false;
  form: any = {
    actividad: null
  };

  color2: ThemePalette = 'primary';
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  actividad: any = {};

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  constructor(private userService: UserService
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getActividad();
  }

  public getActividad(){
    this.loading = true;
    this.userService.getActividadId(this.data.id).subscribe(
      data => {
        this.actividad = data;
        this.form.actividad = data.actividad;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onSubmit(): void{
    this.loading2 = true;
    const { actividad } = this.form;
    this.userService.updateActividad(this.data.id, actividad).subscribe(
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
