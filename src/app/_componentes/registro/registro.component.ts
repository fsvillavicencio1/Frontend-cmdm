import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
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

  form_empresa: any = {
    empresa: null,
    ruc: null
  };
  isSuccessful_empresa = false;
  isSignUpFailed_empresa = false;
  errorMessage_empresa = '';
  loading_empresa = false;

  constructor(private authService: AuthService) { }

  
  ngOnInit(): void {
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
    const { empresa, ruc } = this.form_empresa;
    this.authService.registerEmpresa(empresa, ruc, this.usernameOk).subscribe(
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

}
