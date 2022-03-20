import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  empresa: any = {};

  form_empresa: any = {
    empresa: null,
    ruc: null
  };
  isSuccessful_empresa = false;
  isSignUpFailed_empresa = false;
  errorMessage_empresa = '';
  loading_empresa = false;
  usernameOk: any = [];

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
      this.usernameOk = [user.username];
      console.log(this.id_user);
      this.getExistEmpresa();
    }
  }

  public getExistEmpresa(){
    this.loading = true;
    this.userService.getEmpresa(this.id_user!).subscribe(
      data => {
        if (Object.keys(data).length == 0){
          this.isEmpresa = false;
          this.loading = false;
        }
        else{
          this.isEmpresa = true;
          this.empresa = data;
          this.loading = false;
        }
      },
      err => {
        alert("No se pueden conseguir los datos");
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
        this.isEmpresa = true;
        this.ngOnInit();
      },
      err => {
        this.errorMessage_empresa = err.error.message;
        this.isSignUpFailed_empresa = true;
        this.loading_empresa = false;
      }
    );
  }

}
