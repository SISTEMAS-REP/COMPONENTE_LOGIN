import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

  isVisiblePaso1 : boolean = true;
  isVisiblePaso2 : boolean = false;
  isVisiblePaso3 : boolean = false;
  isVisiblePaso4 : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
  }
  clickPaso2 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = true;
  }

  clickPaso3 = () =>{
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = true;
  }

  clickPaso4 = () =>{
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = true;
  }


}
