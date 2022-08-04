import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionUsuarioEmpresaComponent } from './pages/administracion-usuario-empresa/administracion-usuario-empresa.component';
import { CambiarContrasenaEmpresaComponent } from './pages/cambiar-contrasena-empresa/cambiar-contrasena-empresa.component';
import { CambiarContrasenaPersonaComponent } from './pages/cambiar-contrasena-persona/cambiar-contrasena-persona.component';
import { EdicionPerfilEmpresaComponent } from './pages/edicion-perfil-empresa/edicion-perfil-empresa.component';
import { EdicionPerfilPersonaComponent } from './pages/edicion-perfil-persona/edicion-perfil-persona.component';
import { RecuperarContrasenaEmpresaComponent } from './pages/recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';
import { RecuperarContrasenaPersonaComponent } from './pages/recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RegistroEmpresaComponent } from './pages/registro-empresa/registro-empresa.component';
import { RegistroPersonaComponent } from './pages/registro-persona/registro-persona.component';
import { SesionEmpresaComponent } from './pages/sesion-empresa/sesion-empresa.component';
import { SesionPersonaComponent } from './pages/sesion-persona/sesion-persona.component';

const routes: Routes = [
    { path: 'principal', component: PrincipalComponent },
    { path: 'administracion-usuario-empresa', component: AdministracionUsuarioEmpresaComponent },
    { path: 'cambiar-contrasena-empresa', component: CambiarContrasenaEmpresaComponent },
    { path: 'cambiar-contrasena-persona', component: CambiarContrasenaPersonaComponent },
    { path: 'edicion-perfil-empresa', component: EdicionPerfilEmpresaComponent },
    { path: 'edicion-perfil-persona', component: EdicionPerfilPersonaComponent },
    { path: 'recuperar-contrasena-empresa', component: RecuperarContrasenaEmpresaComponent },
    { path: 'recuperar-contrasena-persona', component: RecuperarContrasenaPersonaComponent },
    { path: 'registro-empresa', component: RegistroEmpresaComponent },
    { path: 'registro-persona', component: RegistroPersonaComponent },
    { path: 'sesion-empresa', component: SesionEmpresaComponent },
    { path: 'sesion-persona', component: SesionPersonaComponent },


    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
