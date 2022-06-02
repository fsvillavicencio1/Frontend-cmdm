import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-tipo',
  templateUrl: './delete-tipo.component.html',
  styleUrls: ['./delete-tipo.component.css']
})
export class DeleteTipoComponent implements OnInit {
  loading = false;
  tipo: any = {};
  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading2 = false;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getTipo();
  }

  public getTipo() {
    this.loading = true;
    this.userService.getTipoId(this.data.id).subscribe(
      data => {
        this.tipo = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  deleteTipo(){
    this.loading2 = true;
    this.userService.deleteTipo(this.data.id).subscribe(
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
