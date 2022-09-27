import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SesionPersonaComponent } from './sesion-persona/sesion-persona.component';
import { SesionEmpresaComponent } from './sesion-empresa/sesion-empresa.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { RecuperarContrasenaPersonaComponent } from './recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RecuperarContrasenaEmpresaComponent } from './recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';
import { EdicionPerfilPersonaComponent } from './edicion-perfil-persona/edicion-perfil-persona.component';
import { EdicionPerfilEmpresaComponent } from './edicion-perfil-empresa/edicion-perfil-empresa.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
registerLocaleData(es);
import { PresentationComponent } from './pages/presentation/presentation.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SesionPersonaComponent,
    SesionEmpresaComponent,
    RegistroPersonaComponent,
    RegistroEmpresaComponent,
    RecuperarContrasenaPersonaComponent,
    RecuperarContrasenaEmpresaComponent,
    EdicionPerfilPersonaComponent,
    EdicionPerfilEmpresaComponent,

    PresentationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,

    NgxSpinnerModule,
    NzModalModule,
    NzNotificationModule,

    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent],
})
export class AppModule {}
