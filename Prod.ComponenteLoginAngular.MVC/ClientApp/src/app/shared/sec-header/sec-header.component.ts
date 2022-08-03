import { Component, OnInit } from '@angular/core';
import { TupaService } from 'src/app/services/tupa.service';
import { ComunService } from 'src/app/services/comun.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from "@angular/material/select";
import { enumerados } from 'src/app/enums/enumerados';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sec-header',
  templateUrl: './sec-header.component.html',
  styleUrls: ['./sec-header.component.css']
})
export class SecHeaderComponent implements OnInit {
  enumerado: enumerados = new enumerados();
  formSearchInicio: FormGroup;
  listaTupas: Array<any>;
  listaTupasSlice: Array<any>;
  page: number;
  cEntries: number;
  pageSize: number;
  paginatorSize: number = 10;
  _sector: number;
  _claseTupa: number;
  textoConsulta: string = '';

  jokes;
  currentJoke = '';

  constructor(
    private tupaService: TupaService,
    private comunService: ComunService,
    private fb: FormBuilder,
    private router : Router
  ) { 
    this.formSearchInicio = this.fb.group({ 

      idTramite: ['', [Validators.required]]
    });
  }

  get idTramiteField() {
    return this.formSearchInicio.get('idTramite') as FormControl;
  }

  get idTramiteErrors() {
    if (this.idTramiteField.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  ngOnInit(): void {
    // this.fnOnchangeTupaListar(true);
    this.doFilter();
  }

  // doFilter() {
  //   // this.jokes = this.service.getData()
  //   //   .pipe(map(jokes => this.filter(jokes)),
  //   //   )
  //   this.page = 1;
  //   this.pageSize = 20;
  //   this._sector = 0;
  //   this._claseTupa = 0;
  //   this.listaTupas = [];

  //   this.tupaService.tupaListar({
  //     IdClaseTupa: this._claseTupa,
  //     IdSector: this._sector,
  //     Page: this.page,
  //     PageSize: this.pageSize,
  //     Query: this.currentJoke
  //   })
  //     .then(resp => {
  //           // this.jokes = this.service.getData()
  //   //   .pipe(map(jokes => this.filter(jokes)),
  //   //   )
  //   this.jokes = resp.data;
  //   this.jokes = this.filter(this.jokes);
  //       this.listaTupas = resp.data;
  //       this.listaTupasSlice = this.listaTupas.slice();
  //     })
  //     .catch(err => []);
  // }

  doFilter() {
    this.page = 1;
    this.pageSize = 10;
    this.listaTupas = [];

    this.comunService.busquedaGeneralListar({
      Page: this.page,
      PageSize: this.pageSize,
      Query: this.currentJoke
    })
      .then(resp => {
    this.jokes = resp.data;
    this.jokes = this.filter(this.jokes);
        this.listaTupas = resp.data;
        this.listaTupasSlice = this.listaTupas.slice();
      })
      .catch(err => []);
  }

  filter(values) {
    // console.log(values)
    return values.filter(joke => joke.descripcion.toLowerCase().includes(this.currentJoke))
  }
  
  detalleTupa(event){
    var itemSelected = null;

    this.jokes.forEach(item =>  {
      if(item.descripcion == this.currentJoke){
        itemSelected = item;
      }
    }); 
    var url="";
    if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.TRAMITE_EN_LINEA){
      url = '/interna-tramite?IdTupa='+itemSelected.id;
      window.location.href = url;
      }
      else if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_ATENCION_AL_CIUDADANO){
        if(itemSelected.es_iframe){
          url = "/consulta-atencion-ciudadano/"+ itemSelected.enlace_seccion;
        }else{
          url = itemSelected.enlace_ruta;
        }
        window.location.href = url;
      }
      else if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_SERVICIOS){
        if(itemSelected.es_iframe){
          url = "/consulta-servicios/"+ itemSelected.enlace_seccion;
        }else{
          url = itemSelected.enlace_ruta;
        }
        window.location.href = url;
      }
      else if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.SERVICIOS_EMPRESARIALES){
        window.location.href = itemSelected.enlace_ruta;
      }
      else if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.APLICACIONES_MOVILES_PESCA){
        window.location.href = itemSelected.enlace_ruta;
      }
      else if(itemSelected.tipo_seccion == this.enumerado.ENUMERADO.APLICACIONES_MOVILES_INDUSTRIA){
        window.location.href = itemSelected.enlace_ruta;
      }
  }
  

  fnOnchangeTupaListar = ( reset) => {
    if(reset){
      this.textoConsulta = '';
    }
    this.page = 1;
    this.pageSize = 10;
    this._sector = 0;
    this._claseTupa = 0;
    this.listaTupas = [];

    this.tupaService.tupaListar({
      IdClaseTupa: this._claseTupa,
      IdSector: this._sector,
      Page: this.page,
      PageSize: this.pageSize,
      Query: this.textoConsulta
    })
      .then(resp => {
        this.listaTupas = resp.data;
        this.listaTupasSlice = this.listaTupas.slice();
      })
      .catch(err => []);
  };


}
