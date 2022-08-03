import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import * as componentes from "./shared/componentes";

// import { ErrorInterceptor } from './helpers/error.interceptor';
// import { RegisterInterceptors } from './helpers/http-settings';
// import { HttpClientInterceptor } from './helpers/http-client.interceptor';
// import * as components from "./shared/components";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ComunService } from './services/comun.service';
import { UbigeoService } from './services/ubigeo.service';

import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material/material.module';
import { DecisionComponent } from './modals/decision/decision.component';
import { TuDocumentoAdjuntosComponent } from './shared/modal/tu-documento-adjuntos/tu-documento-adjuntos.component';
import { TuFlujoComponent } from './shared/modal/tu-flujo/tu-flujo.component';
import { NotificacionDetalleComponent } from './shared/modal/notificacion-detalle/notificacion-detalle.component';
import { TuVerPdfComponent } from './shared/modal/tu-ver-pdf/tu-ver-pdf.component';
import { NgxBootstrapModule } from './shared/modules/ngx-bootstrap.module';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalResetearContrasenaComponent } from './shared/modal/resetear-contrasena/resetear-contrasena.component';
import { ModalIniciarSesionTramiteComponent } from './shared/modal/iniciar-sesion-tramite/iniciar-sesion-tramite.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormularioActivarDesactivarComponent } from './shared/modal/formulario-activar-desactivar/formulario-activar-desactivar.component';
import { FormularioNuevoUsuarioComponent } from './shared/modal/formulario-nuevo-usuario/formulario-nuevo-usuario.component';
import { HabiDesaDomicilioComponent } from './shared/modal/habi-desa-domicilio/habi-desa-domicilio.component';
import { FormularioAdjuntarObservacionComponent } from './shared/modal/formulario-adjuntar-observacion/formulario-adjuntar-observacion.component';
import { ActualizarDatosNotifFisicaComponent } from './shared/modal/actualizar-datos-notif-fisica/actualizar-datos-notif-fisica.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionComponent,
    TuDocumentoAdjuntosComponent,
    TuFlujoComponent,
    NotificacionDetalleComponent,
    TuVerPdfComponent,
    ModalResetearContrasenaComponent,
    ModalIniciarSesionTramiteComponent,
    FormularioActivarDesactivarComponent,
    FormularioNuevoUsuarioComponent,
    HabiDesaDomicilioComponent,
    FormularioAdjuntarObservacionComponent,
    ActualizarDatosNotifFisicaComponent,
    //componentes.DatepickerComponent,
    //DateFormatPipe
    // components.DatatableBodyComponent,
    // components.DatatableComponent,
    // components.DatatableCustomColumnComponent,
    // components.DatatableHeaderComponent,
    // components.DatatablePaginationComponent,
    // components.DatatableToolbarComponent,
    // components.DatatableColumnComponent,
    // components.ModalEnvelopeComponent,
    // components.ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxBootstrapModule,
    NgxSpinnerModule
  ],
  exports:[
    //componentes.DatepickerComponent,
    //DateFormatPipe
    // components.DatatableBodyComponent,
    // components.DatatableComponent,
    // components.DatatableCustomColumnComponent,
    // components.DatatableHeaderComponent,
    // components.DatatablePaginationComponent,
    // components.DatatableToolbarComponent,
    // components.DatatableColumnComponent,
    // components.ModalEnvelopeComponent,
    // components.ProgressBarComponent,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },

    /* { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },*/
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: setAxiosInterceptor, deps: [], multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    ComunService,
    UbigeoService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
