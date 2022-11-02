import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './_componentes/administrador/actividades/actividades.component';
import { CompetitividadComponent } from './_componentes/administrador/competitividad/competitividad.component';
import { TiposComponent } from './_componentes/administrador/tipos_micro/tipos/tipos.component';
import { BlogComponent } from './_componentes/blog/blog.component';
import { ContactosComponent } from './_componentes/contactos/contactos.component';
import { DatosComponent } from './_componentes/datos/datos.component';
import { EvaluateCompetitividadComponent } from './_componentes/evaluate-competitividad/evaluate-competitividad.component';
import { EvaluateMdComponent } from './_componentes/evaluate-md/evaluate-md.component';
import { EvaluateComponent } from './_componentes/evaluate/evaluate.component';
import { HomeComponent } from './_componentes/home/home.component';
import { LoginComponent } from './_componentes/login/login.component';
import { MadurezDigitalComponent } from './_componentes/madurez-digital/madurez-digital.component';
import { DashboardComponent } from './_componentes/microempresa/dashboard/dashboard.component';
import { EmpresaComponent } from './_componentes/microempresa/empresa/empresa.component';
import { EvaluacionMdComponent } from './_componentes/microempresa/evaluacion-md/evaluacion-md.component';
import { EvaluacionComponent } from './_componentes/microempresa/evaluacion/evaluacion.component';
import { MiEmpresaComponent } from './_componentes/microempresa/mi-empresa/mi-empresa.component';
import { PerfilComponent } from './_componentes/microempresa/perfil/perfil.component';
import { ResultadosComponent } from './_componentes/microempresa/resultados/resultados.component';
import { ProyectoCompetitividadComponent } from './_componentes/proyecto-competitividad/proyecto-competitividad.component';
import { ProyectoComponent } from './_componentes/proyecto/proyecto.component';
import { PublicacionComponent } from './_componentes/publicacion/publicacion.component';
import { RecomenadacionesCompetitividadComponent } from './_componentes/recomenadaciones-competitividad/recomenadaciones-competitividad.component';
import { RegistroComponent } from './_componentes/registro/registro.component';
import { ResultadosCompetitividadComponent } from './_componentes/resultados-competitividad/resultados-competitividad.component';
import { ResultadosDigitalizacionComponent } from './_componentes/resultados-digitalizacion/resultados-digitalizacion.component';
import { SendEmailComponent } from './_componentes/send-email/send-email.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'proyecto', component: ProyectoComponent},
  { path: 'proyecto/competitividad', component: ProyectoCompetitividadComponent},
  { path: 'proyecto/madurez-digital', component: MadurezDigitalComponent},
  { path: 'contactos', component: ContactosComponent},
  { path: 'evaluate', component: EvaluateComponent},
  { path: 'evaluate/competitividad', component: EvaluateCompetitividadComponent},
  { path: 'evaluate/madurez-digital', component: EvaluateMdComponent},
  { path: 'resultados/competitividad/:ruc', component: ResultadosCompetitividadComponent},
  { path: 'resultados/madurez/:ruc', component: ResultadosDigitalizacionComponent},
  { path: 'datos', component: DatosComponent},
  /*{ path: 'publicaciones', component: BlogComponent},
  { path: 'publicaciones/:id', component: PublicacionComponent},*/
  /*{ path: 'registro', component: RegistroComponent },*/
  /*{ path: 'share', component: SendEmailComponent},*/
  /*{ path: 'recomendaciones-competitividad/:niveles', component: RecomenadacionesCompetitividadComponent},*/
  /*{ path: 'mi-empresa', component: LoginComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'datos', component: EmpresaComponent },
    { path: 'evaluacion-competitividad', component: EvaluacionComponent },
    { path: 'evaluacion-madurez-digital', component: EvaluacionMdComponent },
    { path: 'resultados', component: ResultadosComponent },
    { path: 'actividades', component: ActividadesComponent },
    { path: 'tipos', component: TiposComponent },
    { path: 'competitividad', component: CompetitividadComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ] },*/
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
