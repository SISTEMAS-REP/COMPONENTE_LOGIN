import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
    EdicionPerfilEmpresaComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    NzModalModule,
    NzNotificationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'sesion-persona', component: SesionPersonaComponent },
      { path: 'sesion-empresa', component: SesionEmpresaComponent },
      { path: 'registro-persona', component: RegistroPersonaComponent },
      { path: 'registro-empresa', component: RegistroEmpresaComponent },
      { path: 'recuperar-contrasena-persona', component: RecuperarContrasenaPersonaComponent },
      { path: 'recuperar-contrasena-empresa', component: RecuperarContrasenaEmpresaComponent },
      { path: 'edicion-perfil-persona', component: EdicionPerfilPersonaComponent },
      { path: 'edicion-perfil-empresa', component: EdicionPerfilEmpresaComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
