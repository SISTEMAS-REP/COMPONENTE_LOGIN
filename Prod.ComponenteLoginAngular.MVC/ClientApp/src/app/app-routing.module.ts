import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TramiteLineaComponent } from './pages/tramite-linea/tramite-linea.component';
import { ConsultaAtencionCiudadanoComponent } from './pages/consulta-atencion-ciudadano/consulta-atencion-ciudadano.component';
import { ConsultaServiciosComponent } from './pages/consulta-servicios/consulta-servicios.component';
import { ConsultaAplicacionesComponent } from './pages/consulta-aplicaciones/consulta-aplicaciones.component';
import { MapaSitioComponent } from './pages/mapa-sitio/mapa-sitio.component';
import { AppsMovilesComponent } from './pages/apps-moviles/apps-moviles.component';
import { SesionEmpresaComponent } from './pages/sesion-empresa/sesion-empresa.component';
import { SesionPersonaComponent } from './pages/sesion-persona/sesion-persona.component';
import { RegistroEmpresaComponent } from './pages/registro-empresa/registro-empresa.component';
import { EditarEmpresaComponent } from './pages/editar-empresa/editar-empresa.component';
import { RegistroPersonaComponent } from './pages/registro-persona/registro-persona.component';
import { EditarPersonaComponent } from './pages/editar-persona/editar-persona.component';
import { RecuperarContrasenaPersonaComponent } from './pages/recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RecuperarContrasenaEmpresaComponent } from './pages/recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';
import { InternaTramiteComponent } from './pages/interna-tramite/interna-tramite.component';
import { AdministrarUsuarioRepreComponent } from './pages/administrar-usuario-repre/administrar-usuario-repre.component';
const routes: Routes = [
    { path: 'principal', component: PrincipalComponent },
    { path: 'tramite-linea', component: TramiteLineaComponent },
    { path: 'tramite-linea/:sector', component: TramiteLineaComponent },

    { path: 'consulta-atencion-ciudadano', component: ConsultaAtencionCiudadanoComponent },
    { path: 'consulta-atencion-ciudadano/:consulta', component: ConsultaAtencionCiudadanoComponent },

    { path: 'consulta-servicios', component: ConsultaServiciosComponent },
    { path: 'consulta-servicios/:servicio', component: ConsultaServiciosComponent },
    { path: 'consulta-aplicaciones', component: ConsultaAplicacionesComponent },

    { path: 'mapa-sitio', component: MapaSitioComponent },
    { path: 'apps-moviles', component: AppsMovilesComponent },
    { path: 'sesion-empresa', component: SesionEmpresaComponent },
    { path: 'sesion-persona', component: SesionPersonaComponent },
    { path: 'registro-empresa', component: RegistroEmpresaComponent },
    { path: 'editar-empresa', component: EditarEmpresaComponent },
    { path: 'registro-persona', component: RegistroPersonaComponent },
    { path: 'editar-persona', component: EditarPersonaComponent },
    { path: 'recuperar-contrasena-persona', component: RecuperarContrasenaPersonaComponent },
    { path: 'recuperar-contrasena-empresa', component: RecuperarContrasenaEmpresaComponent },
    { path: 'administrar-usuario-representante-legal', component: AdministrarUsuarioRepreComponent },
    { path: 'interna-tramite', component: InternaTramiteComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'principal' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
