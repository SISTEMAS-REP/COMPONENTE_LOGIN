import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

import { PrincipalComponent } from './principal/principal.component';
import { SecAppsMovilComponent } from '../shared/sec-apps-movil/sec-apps-movil.component';
import { SecHeaderComponent } from '../shared/sec-header/sec-header.component';
import { SecFooterComponent } from '../shared/sec-footer/sec-footer.component';
import { SecProcedimientosComponent } from '../shared/sec-procedimientos/sec-procedimientos.component';
import { SecConsultasComponent } from '../shared/sec-consultas/sec-consultas.component';
import { SecServiciosComponent } from '../shared/sec-servicios/sec-servicios.component';
import { SecHeaderSimpleComponent } from '../shared/sec-header-simple/sec-header-simple.component';
import { SecInicioComponent } from '../shared/sec-inicio/sec-inicio.component';
import { SecHeaderWithoutLoginComponent } from '../shared/sec-header-without-login/sec-header-without-login.component';
import { DatosUsuarioComponent } from '../shared/datos-usuario/datos-usuario.component';
import { TramitesUsuarioComponent } from '../shared/tramites-usuario/tramites-usuario.component';
import { NotificacionesUsuarioComponent } from '../shared/notificaciones-usuario/notificaciones-usuario.component';
import { SelectComponent } from '../directives/select.component';
import { ModalComponent } from '../shared/modal/modal.component';
import {MaterialModule} from 'src/app/material/material.module';
import { NgxBootstrapModule } from '../shared/modules/ngx-bootstrap.module';
import { DatepickerComponent, ProgressBarComponent, ModalEnvelopeComponent, AlertComponent, AlertCustomComponent } from '../shared/componentes';
import { DateFormatPipe } from '../pipes/date-format.pipe';
// import { ModalResetearContrasenaComponent } from '../shared/modal/resetear-contrasena/resetear-contrasena.component';
import { AplicacionesUsuarioComponent } from '../shared/aplicaciones-usuario/aplicaciones-usuario.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdministracionUsuarioEmpresaComponent } from './administracion-usuario-empresa/administracion-usuario-empresa.component';
import { CambiarContrasenaEmpresaComponent } from './cambiar-contrasena-empresa/cambiar-contrasena-empresa.component';
import { CambiarContrasenaPersonaComponent } from './cambiar-contrasena-persona/cambiar-contrasena-persona.component';
import { EdicionPerfilEmpresaComponent } from './edicion-perfil-empresa/edicion-perfil-empresa.component';
import { EdicionPerfilPersonaComponent } from './edicion-perfil-persona/edicion-perfil-persona.component';
import { RecuperarContrasenaEmpresaComponent } from './recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';
import { RecuperarContrasenaPersonaComponent } from './recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { SesionEmpresaComponent } from './sesion-empresa/sesion-empresa.component';
import { SesionPersonaComponent } from './sesion-persona/sesion-persona.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    SecAppsMovilComponent,
    SecHeaderComponent,
    SecFooterComponent,
    SecProcedimientosComponent,
    SecConsultasComponent,
    SecServiciosComponent,
    SecHeaderSimpleComponent,
    SecInicioComponent,
    SecHeaderWithoutLoginComponent,
    DatosUsuarioComponent,
    TramitesUsuarioComponent,
    NotificacionesUsuarioComponent,
    AdministracionUsuarioEmpresaComponent,
    CambiarContrasenaEmpresaComponent,
    CambiarContrasenaPersonaComponent,
    EdicionPerfilEmpresaComponent,
    EdicionPerfilPersonaComponent,
    RecuperarContrasenaEmpresaComponent,
    RecuperarContrasenaPersonaComponent,
    RegistroEmpresaComponent,
    RegistroPersonaComponent,
    SesionEmpresaComponent,
    SesionPersonaComponent,
    SelectComponent,
    ModalComponent,
    DatepickerComponent,
    ProgressBarComponent,
    ModalEnvelopeComponent,
    AlertComponent,
    AlertCustomComponent,
    DateFormatPipe,    
    AplicacionesUsuarioComponent

    // ModalResetearContrasenaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MaterialModule,
    NgxBootstrapModule,
    NgxSpinnerModule
  ],
  exports:[
    // ParticipantesComponent,
    // LoginComponent
  ],
  entryComponents: [ModalComponent]
})
export class PagesModule { }
