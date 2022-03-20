import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_componentes/home/home.component';
import { LoginComponent } from './_componentes/login/login.component';
import { DashboardComponent } from './_componentes/microempresa/dashboard/dashboard.component';
import { EmpresaComponent } from './_componentes/microempresa/empresa/empresa.component';
import { EvaluacionComponent } from './_componentes/microempresa/evaluacion/evaluacion.component';
import { MiEmpresaComponent } from './_componentes/microempresa/mi-empresa/mi-empresa.component';
import { RegistroComponent } from './_componentes/registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mi-empresa', component: LoginComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'datos', component: EmpresaComponent },
    { path: 'evaluacion', component: EvaluacionComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ] },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
