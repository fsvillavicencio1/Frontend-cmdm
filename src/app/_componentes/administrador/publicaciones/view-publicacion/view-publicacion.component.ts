import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-publicacion',
  templateUrl: './view-publicacion.component.html',
  styleUrls: ['./view-publicacion.component.css']
})
export class ViewPublicacionComponent implements OnInit {
  loading = false;
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  publicacion: any = {};


  constructor(private userService: UserService
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPublicacion();
  }

  public getPublicacion(){
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

}
