import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-actividad',
  templateUrl: './register-actividad.component.html',
  styleUrls: ['./register-actividad.component.css']
})
export class RegisterActividadComponent implements OnInit {
  loading = false;
  form: any = {
    actividad: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.loading = true;
    const { actividad } = this.form;
    this.userService.registerActividad(actividad).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.loading = false;
      }
    );
  }

}
