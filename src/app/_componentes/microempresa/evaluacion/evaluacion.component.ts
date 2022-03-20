import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  isLoggedIn = false;
  id_user?: number;
  loading = false;
  isEmpresa = false;
  empresa: any = {};

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id_user = user.id;
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

}
