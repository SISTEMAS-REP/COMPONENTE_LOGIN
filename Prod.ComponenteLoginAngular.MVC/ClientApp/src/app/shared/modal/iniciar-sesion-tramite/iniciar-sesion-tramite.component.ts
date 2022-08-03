import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';

@Component({
  selector: 'app-iniciar-sesion-tramite',
  templateUrl: './iniciar-sesion-tramite.component.html',
  styleUrls: ['./iniciar-sesion-tramite.component.css']
})
export class ModalIniciarSesionTramiteComponent implements OnInit {
  form: FormGroup;

  constructor() {

  }


  ngOnInit(): void {

  }


}
