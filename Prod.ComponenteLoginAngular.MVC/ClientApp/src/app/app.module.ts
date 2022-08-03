import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { SesionPersonaComponent } from './sesion-persona/sesion-persona.component';
import { SesionEmpresaComponent } from './sesion-empresa/sesion-empresa.component';
import { RecuperarContrasenaPersonaComponent } from './recuperar-contrasena-persona/recuperar-contrasena-persona.component';
import { RecuperarContrasenaEmpresaComponent } from './recuperar-contrasena-empresa/recuperar-contrasena-empresa.component';

import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CambiarContrasenaPersonaComponent } from './cambiar-contrasena-persona/cambiar-contrasena-persona.component';
import { CambiarContrasenaEmpresaComponent } from './cambiar-contrasena-empresa/cambiar-contrasena-empresa.component';
import { EdicionPerfilPersonaComponent } from './edicion-perfil-persona/edicion-perfil-persona.component';
import { EdicionPerfilEmpresaComponent } from './edicion-perfil-empresa/edicion-perfil-empresa.component';
import { AdministracionUsuarioEmpresaComponent } from './administracion-usuario-empresa/administracion-usuario-empresa.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegistroPersonaComponent,
    RegistroEmpresaComponent,
    SesionPersonaComponent,
    SesionEmpresaComponent,
    RecuperarContrasenaPersonaComponent,
    RecuperarContrasenaEmpresaComponent,
    CambiarContrasenaPersonaComponent,
    CambiarContrasenaEmpresaComponent,
    EdicionPerfilPersonaComponent,
    EdicionPerfilEmpresaComponent,
    AdministracionUsuarioEmpresaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'registro-empresa', component: RegistroEmpresaComponent },
      { path: 'registro-persona', component: RegistroPersonaComponent },
      { path: 'sesion-empresa', component: SesionEmpresaComponent },
      { path: 'sesion-persona', component: SesionPersonaComponent },
      { path: 'recuperar-contrasena-empresa', component: RecuperarContrasenaEmpresaComponent },
      { path: 'recuperar-contrasena-persona', component: RecuperarContrasenaPersonaComponent },
      { path: 'cambiar-contrasena-empresa', component: CambiarContrasenaEmpresaComponent },
      { path: 'cambiar-contrasena-persona', component: CambiarContrasenaPersonaComponent },
      { path: 'edicion-perfil-empresa', component: EdicionPerfilEmpresaComponent },
      { path: 'edicion-perfil-persona', component: EdicionPerfilPersonaComponent },
      { path: 'administracion-usuario-empresa', component: AdministracionUsuarioEmpresaComponent },    
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
