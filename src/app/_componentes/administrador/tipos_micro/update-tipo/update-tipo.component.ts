import { Component, OnInit, Inject } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-tipo',
  templateUrl: './update-tipo.component.html',
  styleUrls: ['./update-tipo.component.css']
})
export class UpdateTipoComponent implements OnInit {
  loading = false;
  form: any = {
    tipo: null
  };

  color2: ThemePalette = 'primary';
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  tipo: any = {};

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  constructor(private userService: UserService
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.getTipo();
    }
  
    public getTipo(){
      this.loading = true;
      this.userService.getTipoId(this.data.id).subscribe(
        data => {
          this.tipo = data;
          this.form.tipo = data.tipo;
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
      const { tipo } = this.form;
      this.userService.updateTipo(this.data.id, tipo).subscribe(
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
