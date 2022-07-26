import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena-empresa',
  templateUrl: './recuperar-contrasena-empresa.component.html',
  styleUrls: ['./recuperar-contrasena-empresa.component.css']
})
export class RecuperarContrasenaEmpresaComponent implements OnInit {
  validateForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
