import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './_componentes/administrador/actividades/actividades.component';
import { CompetitividadComponent } from './_componentes/administrador/competitividad/competitividad.component';
import { HomeComponent } from './_componentes/home/home.component';
import { LoginComponent } from './_componentes/login/login.component';
import { DashboardComponent } from './_componentes/microempresa/dashboard/dashboard.component';
import { EmpresaComponent } from './_componentes/microempresa/empresa/empresa.component';
import { EvaluacionMdComponent } from './_componentes/microempresa/evaluacion-md/evaluacion-md.component';
import { EvaluacionComponent } from './_componentes/microempresa/evaluacion/evaluacion.component';
import { MiEmpresaComponent } from './_componentes/microempresa/mi-empresa/mi-empresa.component';
import { ResultadosComponent } from './_componentes/microempresa/resultados/resultados.component';
import { PublicacionComponent } from './_componentes/publicacion/publicacion.component';
import { RegistroComponent } from './_componentes/registro/registro.component';
import { SendEmailComponent } from './_componentes/send-email/send-email.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'publicacion/:nombre', component: PublicacionComponent},
  { path: 'share', component: SendEmailComponent},
  { path: 'mi-empresa', component: LoginComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'datos', component: EmpresaComponent },
    { path: 'evaluacion-competitividad', component: EvaluacionComponent },
    { path: 'evaluacion-madurez-digital', component: EvaluacionMdComponent },
    { path: 'resultados', component: ResultadosComponent },
    { path: 'actividades', component: ActividadesComponent },
    { path: 'competitividad', component: CompetitividadComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
