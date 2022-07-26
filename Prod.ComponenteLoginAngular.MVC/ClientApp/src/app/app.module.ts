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

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    RecuperarContrasenaEmpresaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'registro-persona', component: RegistroPersonaComponent },
      { path: 'registro-empresa', component: RegistroEmpresaComponent },
      { path: 'sesion-persona', component: SesionPersonaComponent },
      { path: 'sesion-empresa', component: SesionEmpresaComponent },
      { path: 'recuperar-contrasena-persona', component: RecuperarContrasenaPersonaComponent },
      { path: 'recuperar-contrasena-empresa', component: RecuperarContrasenaEmpresaComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
