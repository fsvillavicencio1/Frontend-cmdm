import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

export interface Users {
  correo: string;
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  constructor(private rutaActiva: ActivatedRoute, private userService: UserService) { }
  url_final = '';
  form: any = {
    correo: null,
    cuerpo: null
  };

  loading = false;

  public Editor = ClassicEditorBuild;
  color: ThemePalette = 'primary';
  color2: ThemePalette = 'warn';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  mode: ProgressSpinnerMode = 'indeterminate';

  /**/



  ngOnInit(): void {
    const url1 = this.rutaActiva.snapshot.queryParamMap.get('url');
    const url2 = this.rutaActiva.snapshot.queryParamMap.get('autoAuth');
    const url3 = this.rutaActiva.snapshot.queryParamMap.get('ctid');
    const url4 = this.rutaActiva.snapshot.queryParamMap.get('config');
    const url5 = this.rutaActiva.snapshot.queryParamMap.get('filter');
    this.url_final = url1 
    + "&autoAuth=" + String(url2) 
    + "&ctid=" + String(url3)
    + "&config=" + String(url4)
    + "&filter=" + String(url5);
    console.log(this.url_final);
    this.form.cuerpo = "<p>Estimado estudiante:<br><br>"
    +"A continuación se adjunta un informe con los resultados "
    +"de niveles de competitividad y madurez digital para su respectiva revisión y análisis.</p>";
  }

  onSubmit(): void {
    this.loading = true;
    const { correo, cuerpo } = this.form;
    this.userService.sendEmailStudent(correo, cuerpo ,this.url_final).subscribe(
      data => {
        console.log("Ok")
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
        alert("Correo enviado con éxito")
       window.close();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.loading = false;
        console.log("Error")
      }
    );
  }


 

}
