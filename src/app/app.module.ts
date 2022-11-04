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
import { ResultadosComponent } from './_componentes/microempresa/resultados/resultados.component';
import { CompeDigitalComponent } from './_componentes/compe-digital/compe-digital.component';
import { ParallaxComponent } from './_componentes/parallax/parallax.component';
import { SectorEmpresarialComponent } from './_componentes/sector-empresarial/sector-empresarial.component';
import { ActividadesComponent } from './_componentes/administrador/actividades/actividades.component';
import { CompetitividadComponent } from './_componentes/administrador/competitividad/competitividad.component';
import { MatTableModule } from '@angular/material/table';
import { RegisterActividadComponent } from './_componentes/administrador/actividades_micro/register-actividad/register-actividad.component';
import { UpdateActividadComponent } from './_componentes/administrador/actividades_micro/update-actividad/update-actividad.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewPublicacionComponent } from './_componentes/administrador/publicaciones/view-publicacion/view-publicacion.component';
import { UpdatePublicacionComponent } from './_componentes/administrador/publicaciones/update-publicacion/update-publicacion.component';
import { DeletePublicacionComponent } from './_componentes/administrador/publicaciones/delete-publicacion/delete-publicacion.component';
import { ProcesoCompetitividadComponent } from './_componentes/proceso-competitividad/proceso-competitividad.component';
import { PublicacionComponent } from './_componentes/publicacion/publicacion.component';
import { FooterComponent } from './_componentes/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SendEmailComponent } from './_componentes/send-email/send-email.component';
import { EvaluacionMdComponent } from './_componentes/microempresa/evaluacion-md/evaluacion-md.component';
import { MadurezDigitalComponent } from './_componentes/madurez-digital/madurez-digital.component';
import { ProyectoCompetitividadComponent } from './_componentes/proyecto-competitividad/proyecto-competitividad.component';
import { ProyectoComponent } from './_componentes/proyecto/proyecto.component';
import { ContactosComponent } from './_componentes/contactos/contactos.component';
import { BlogComponent } from './_componentes/blog/blog.component';
import { DeleteActividadComponent } from './_componentes/administrador/actividades_micro/delete-actividad/delete-actividad.component';
import { TiposComponent } from './_componentes/administrador/tipos_micro/tipos/tipos.component';
import { RegisterTipoComponent } from './_componentes/administrador/tipos_micro/register-tipo/register-tipo.component';
import { UpdateTipoComponent } from './_componentes/administrador/tipos_micro/update-tipo/update-tipo.component';
import { DeleteTipoComponent } from './_componentes/administrador/tipos_micro/delete-tipo/delete-tipo.component';
import { ButtonTopComponent } from './_componentes/button-top/button-top.component';
import { HeaderComponent } from './_componentes/header/header.component';
import { PerfilComponent } from './_componentes/microempresa/perfil/perfil.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ResultadosCompetitividadComponent } from './_componentes/resultados-competitividad/resultados-competitividad.component';
import { ResultadosDigitalizacionComponent } from './_componentes/resultados-digitalizacion/resultados-digitalizacion.component';
import { RecomenadacionesCompetitividadComponent } from './_componentes/recomenadaciones-competitividad/recomenadaciones-competitividad.component';
import { EvaluateComponent } from './_componentes/evaluate/evaluate.component';
import { EvaluateMdComponent } from './_componentes/evaluate-md/evaluate-md.component';
import { EvaluateCompetitividadComponent } from './_componentes/evaluate-competitividad/evaluate-competitividad.component';
import { EstadisticasComponent } from './_componentes/estadisticas/estadisticas.component';
import { DatosComponent } from './_componentes/datos/datos.component';

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
    UpdateEmpresaComponent,
    ResultadosComponent,
    CompeDigitalComponent,
    ParallaxComponent,
    SectorEmpresarialComponent,
    ActividadesComponent,
    CompetitividadComponent,
    RegisterActividadComponent,
    UpdateActividadComponent,
    ViewPublicacionComponent,
    UpdatePublicacionComponent,
    DeletePublicacionComponent,
    ProcesoCompetitividadComponent,
    PublicacionComponent,
    FooterComponent,
    SendEmailComponent,
    EvaluacionMdComponent,
    MadurezDigitalComponent,
    ProyectoCompetitividadComponent,
    ProyectoComponent,
    ContactosComponent,
    BlogComponent,
    DeleteActividadComponent,
    TiposComponent,
    RegisterTipoComponent,
    UpdateTipoComponent,
    DeleteTipoComponent,
    ButtonTopComponent,
    HeaderComponent,
    PerfilComponent,
    ResultadosCompetitividadComponent,
    ResultadosDigitalizacionComponent,
    RecomenadacionesCompetitividadComponent,
    EvaluateComponent,
    EvaluateMdComponent,
    EvaluateCompetitividadComponent,
    EstadisticasComponent,
    DatosComponent
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
    MatListModule,
    MatTableModule,
    CKEditorModule,
    FlexLayoutModule,
    MatTabsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
