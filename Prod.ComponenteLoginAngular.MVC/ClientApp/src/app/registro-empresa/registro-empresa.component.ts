import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  ngOnInit(): void {
  }

  clickPaso1 = () =>{
    this.isVisiblePaso1 = true;
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = false;
  }
  clickPaso2 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = true;
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = false;
  }

  clickPaso3 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = true;
    this.isVisiblePaso4 = false;
  }

  clickPaso4 = () =>{
    this.isVisiblePaso1 = false;
    this.isVisiblePaso2 = false;
    this.isVisiblePaso3 = false;
    this.isVisiblePaso4 = true;
  }


}
