import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { EdicionPerfilEmpresaComponent } from './edicion-perfil-empresa/edicion-perfil-empresa.component';
import { EdicionPerfilPersonaComponent } from './edicion-perfil-persona/edicion-perfil-persona.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AuthGuard } from './guards/auth.guard';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { RecuperarContrasenaEmpresaComponent } from './recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';
import { RecuperarContrasenaPersonaComponent } from './recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { SesionEmpresaComponent } from './sesion-empresa/sesion-empresa.component';
import { SesionPersonaComponent } from './sesion-persona/sesion-persona.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'presentation',
    pathMatch: 'full',
  },
  {
    path: 'presentation',
    component: PresentationComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },

  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'sesion-persona', component: SesionPersonaComponent },
  { path: 'sesion-empresa', component: SesionEmpresaComponent },
  { path: 'registro-persona', component: RegistroPersonaComponent },
  { path: 'registro-empresa', component: RegistroEmpresaComponent },
  {
    path: 'recuperar-contrasena-persona',
    component: RecuperarContrasenaPersonaComponent,
  },
  {
    path: 'recuperar-contrasena-empresa',
    component: RecuperarContrasenaEmpresaComponent,
  },
  { path: 'edicion-perfil-persona', component: EdicionPerfilPersonaComponent },
  { path: 'edicion-perfil-empresa', component: EdicionPerfilEmpresaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /* { useHash: true } */)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
