import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-register-tipo',
  templateUrl: './register-tipo.component.html',
  styleUrls: ['./register-tipo.component.css']
})
export class RegisterTipoComponent implements OnInit {
  loading = false;
  form: any = {
    tipo: null
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
    const { tipo } = this.form;
    this.userService.registerTipo(tipo).subscribe(
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
