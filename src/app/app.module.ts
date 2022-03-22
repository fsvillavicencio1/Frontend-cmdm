import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_componentes/home/home.component';
import { CarouselComponent } from './_componentes/carousel/carousel.component';
import { LoginComponent } from './_componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './_componentes/registro/registro.component';
import { AuspiciantesComponent } from './_componentes/auspiciantes/auspiciantes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MiEmpresaComponent } from './_componentes/microempresa/mi-empresa/mi-empresa.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './_componentes/microempresa/dashboard/dashboard.component';
import { EmpresaComponent } from './_componentes/microempresa/empresa/empresa.component';
import { EvaluacionComponent } from './_componentes/microempresa/evaluacion/evaluacion.component';
import { UpdateEmpresaComponent } from './_componentes/microempresa/update-empresa/update-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    LoginComponent,
    RegistroComponent,
    AuspiciantesComponent,
    MiEmpresaComponent,
    DashboardComponent,
    EmpresaComponent,
    EvaluacionComponent,
    UpdateEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
