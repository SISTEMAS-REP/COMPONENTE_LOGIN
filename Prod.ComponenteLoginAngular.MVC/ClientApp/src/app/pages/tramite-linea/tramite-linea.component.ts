import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { enumerados } from 'src/app/enums/enumerados';
import { itemsOpcionesTramite } from 'src/app/enums/items';
import { TupaService } from 'src/app/services/tupa.service';
import { ComunService } from 'src/app/services/comun.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TupaRequisitoService } from 'src/app/services/tupaRequisito.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { tupaModel } from 'src/app/interfaces/models/tupaModel';
import { solicitudRegistroModel, ConcentimientoSNEModel } from 'src/app/interfaces/models/solicitudModel';
import { archivoAdjuntoModel } from 'src/app/interfaces/models/solicitudModel';
import { ModalIniciarSesionTramiteComponent } from 'src/app/shared/modal/iniciar-sesion-tramite/iniciar-sesion-tramite.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HabiDesaDomicilioComponent } from 'src/app/shared/modal/habi-desa-domicilio/habi-desa-domicilio.component';
import { ActualizarDatosNotifFisicaComponent } from 'src/app/shared/modal/actualizar-datos-notif-fisica/actualizar-datos-notif-fisica.component';

@Component({
  selector: 'app-tramite-linea',
  templateUrl: './tramite-linea.component.html',
  // styleUrls: ['./tramite-linea.component.css']
})
export class TramiteLineaComponent implements OnInit {
  private route: ActivatedRouteSnapshot;
  formTupa = new tupaModel();
  formSolicitud = new solicitudRegistroModel();
  adjunto = new archivoAdjuntoModel();
  listaTupaRequisito: Array<any>;
  usuario: any;
  enumerado: enumerados = new enumerados();
  textoConsulta: string = '';
  buscar: string = '';
  idTupa = 0;
  codDep = 0;
  CodDependencia = 0;
  listaTupas: Array<any>;
  listaDependenciasPrincipales: Array<any>;
  listaDependencias: Array<any>;
  listaClaseDocumento: Array<any>;
  listaServicioTramite: Array<any>;
  page: number;
  cEntries: number;
  pageSize: number;
  paginatorSize: number = 5;
  lastPage: number;
  _sector: number;
  _claseTupa: number;
  isAuth = false;
  isTupa = false;
  isNoTupa = false;
  isPaso1 = true;
  isPaso2 = false;
  isPaso3 = false;
  lista = itemsOpcionesTramite;
  coddep_principal = 0;
  isAcceptTerms = false;
  isAgregarArchivos = false;
  dependenciaSeleccionada: any;
  adjuntoPrincipal : any;
  adjuntoSecundario : any;
  adjuntoRequisito: any;
  descripcion_adjunto: string;
  uploader_adjunto_filename: string;
  reg_adjuntos : Array<any> =[];
  lista_requisitos : Array<any> =[];
  tupaRequisito: any;
  descripcion_archivo_tupa: string;
  uploader_requisito_filename: string;
  isVisibleVua: Boolean;
  isVisibleValidarSubirArchivo: boolean = false;
  isVisibleValidarAdjuntarArchivo: boolean = true;
  isVisibleValidarSubirArchivoMas: boolean = false;
  isVisibleValidarSubirArchivoRequisitoTupa:boolean = false;
  info = new ConcentimientoSNEModel;

  constructor(
    private routeActive: ActivatedRoute,
    elm: ElementRef,
    public dialog: MatDialog,
    private tupaService: TupaService,
    private comunService: ComunService,
    private solicitudService: SolicitudService,
    private _alertService: AlertService,
    private tupaRequisitoService: TupaRequisitoService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.route = activatedRoute.snapshot;

    this.page = 1;
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
  }
  ngOnInit(): void {
    this.comunService.obtenerDatosUsuario()
    .then(resp => {
      this.usuario = resp.data;
      if(this.usuario != undefined){
        this.GetInformacionPersona();
      }
      
    })

    this.formSolicitud.clase = "0";
    this.fnBtnTupaListar(0, this.enumerado.CLASE_TUPA.PROCESOS, null,true);
    this.fnDependenciasPrincipalesListar();
    
    if(this.routeActive.snapshot.queryParams.IdTupa != undefined){
      this.idTupa = Number(this.routeActive.snapshot.queryParams.IdTupa);
      this.fnCargarDatosTupa(this.idTupa);
      this.isTupa = true;
      this.isNoTupa = false;
      this.isPaso1 = false;
      this.isPaso2 = true;
      this.isPaso3 = false;
    }
    if(this.routeActive.snapshot.queryParams.CodDep != undefined){
      this.codDep = Number(this.routeActive.snapshot.queryParams.CodDep);
      this.fnObtenerDependencia(this.codDep);
      this.isTupa = false;
      this.isNoTupa = true;
      this.isPaso1 = false;
      this.isPaso2 = true;
      this.isPaso3 = false;
    }
    if(this.routeActive.snapshot.queryParams.CodDependencia != undefined){
      this.CodDependencia = Number(this.routeActive.snapshot.queryParams.CodDependencia);
      this.fnObtenerDependencia(this.CodDependencia);
      this.isTupa = false;
      this.isNoTupa = true;
      this.isPaso1 = true;
      this.isPaso2 = false;
      this.isPaso3 = false;
      this.isVisibleVua = true;
      this.coddep_principal = 413;
      this.buscar = "DIRECCIÓN GENERAL DE ACUICULTURA-DGA";
      this.handleListarServicioTramite();
    }
  }

  GetInformacionPersona = () => {
    this.comunService.GetInformacionPersona()
      .then(resp => {
        if(resp.success){
          this.info = resp.data;
        }
      })
      .catch(err => []);
  }

  openModalDomicilioElectronicoDesactivar =(item)=>{
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: { },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(ActualizarDatosNotifFisicaComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.GetInformacionPersona();
    });


    // var obj = {
    //   respuesta_aviso : item == 1 ? true : false
    // }
    // this.comunService.GuardarConsentimiento(obj)
    // .then(resp => {
    //   if(resp.success){
    //     this.info = resp.data;
    //     this.GetInformacionPersona();
    //     this._alertService.open("success",(`Se guardó correctamente`));
    //   }
    // })
    // .catch(err => []);
  }

  GuardarRespuestaAviso =(item)=>{

    var obj = {
      respuesta_aviso : item == 1 ? true : false
    }
    this.comunService.GuardarConsentimiento(obj)
    .then(resp => {
      if(resp.success){
        this.info = resp.data;
        this.GetInformacionPersona();
        this._alertService.open("success",(`Se guardó correctamente`));
      }
    })
    .catch(err => []);
  }

  openModalDomicilioElectronico =()=>{
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: { },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(HabiDesaDomicilioComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.GetInformacionPersona();
    });
  }

  fnCargarDatosTupa = (id) => {
    this.tupaService.tupaObtenerPorId({
      IdTupa: id
    })
      .then(resp => {
        let data = resp.data;
        this.formTupa.descripcion = data.descripcion;
        this.formTupa.uit = data.uit;
        this.formTupa.cantidad = data.cantidad;
        this.formTupa.numeroDias = data.numeroDias;
        this.formTupa.numeroTupa = data.numeroTupa;
        this.formTupa.nombreDependencia = data.nombreDependencia;
        this.formTupa.codigoDependencia = data.codigoDependencia;
        this.formTupa.link = data.link;
        this.formTupa.automatizado = data.automatizado;
        this.formTupa.idTupa = id;
      })
      .catch(err => []);
  }

  fnEvChangeTextoConsulta = (textoConsulta: string) => {
    this.fnBtnTupaListar(0, this._claseTupa,null,false);
  }

  loadParams() {
    const param = this.route.params.sector || 'pesca';
    Object.keys(this.lista).filter((sector) => {
        if(param == sector){
          this.fnBtnTupaListar(0,this.lista[sector].tupa.clase,null,false);
        }
    });
  }

  fnBtnTupaListar = (sector, claseTupa, event,reset) => {

    if(reset){
      this.textoConsulta = '';
    }

    this.page = 1;
    this.pageSize = 5;
    this._sector = 0;
    this._claseTupa = claseTupa;

    this.listaTupas = [];
    if(event){
      var opcion = document.getElementsByClassName('opcionTupa');
      for(var i = 0;i < opcion.length;i++){
        opcion[i].classList.remove('active');
      }
      event.target.classList.add('active');
    }
    this.onChangeStatusOpcion(sector, claseTupa);

    this.tupaService
      .tupaListarPorClaseSector({
        IdClaseTupa: this._claseTupa,
        IdSector: this._sector,
        Page: this.page,
        PageSize: this.pageSize,
        Query: this.textoConsulta,
      })
      .then((resp) => {
        this.listaTupas = resp.data;
        if (this.listaTupas.length > 0) {  this.fnPaginar();  }
      })
      .catch((err) => []);
  };
  
  fnBtnTipoTramiteListar = (event,value) => {
    this.listaTupas = [];
    if(event){
      var opcion = document.getElementsByClassName('btn-tramite4');
      for(var i = 0;i < opcion.length;i++){
        opcion[i].classList.remove('active');
      }
      event.target.classList.add('active');
    }
    if(value == 1){
      this.isTupa = true;
      this.isNoTupa = false;
      this.loadParams();
    }else if(value == 2){
      this.isTupa = false;
      this.isNoTupa = true;
    }
  };

  onChangeStatusOpcion = (sector, claseTupa) => {

      Object.keys(this.lista).filter((sector) => {
        Object.keys(this.lista[sector]).filter((clase) => {
          this.lista[sector][clase].status = false;
          const tag = { ...this.lista[sector][clase] };
          if (tag.clase == claseTupa && tag.sector == sector) {
            this.lista[sector][clase].status = true;
          }
        });
      });

  }

  fnBtnTupaPaginado = (paginado, pageSize = 5) => {
    this.pageSize = pageSize;
    switch (paginado) {
      case 1:
        this.page = 1;
        break;
      case 2:
        this.page = this.page > 1 ? this.page - 1 : 1;
        break;
      case 3:
        this.page =
          this.page < Math.floor(this.cEntries / this.pageSize)
            ? this.page + 1
            : Math.floor(this.cEntries / this.pageSize);
        break;
      case 4:
        this.page = Math.floor(this.cEntries / this.pageSize);
        break;
      default:
        break;
    }
    this.tupaService
      .tupaListarPorClaseSector({
        IdClaseTupa: this._claseTupa,
        IdSector: this._sector,
        Page: this.page,
        PageSize: pageSize,
        Query: this.textoConsulta,
      })
      .then((resp) => {
        this.listaTupas = resp.data;
        if (this.listaTupas.length > 0) {
          this.fnPaginar();
        }
      })
      .catch((err) => []);
  };

  fnPaginar = () => {
    var obj = this.listaTupas[0];
    this.cEntries = obj.totalRows;
    let indexLastPage = Math.floor(this.cEntries / this.pageSize);
    if (this.cEntries % this.pageSize == 0) indexLastPage--;
    let indexLastRange = Math.floor(
      this.cEntries / (this.paginatorSize * this.pageSize)
    );
    if (this.cEntries % (this.paginatorSize * this.pageSize) == 0)
      indexLastRange--;
    var start = this.page * this.paginatorSize;
    var end = start + this.paginatorSize;
    this.lastPage = indexLastPage;
  };

  fnEliminarBusqueda = () => {};

  fnAbrirPTD = () => {
    var a = document.createElement('a');
    a.href = environment.apiPTD;
    a.target = '_blank';
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  };

  fnDependenciasPrincipalesListar = () => {
    this.comunService
      .ObtenerDependenciasPrincipales()
      .then((resp) => {
        this.listaDependenciasPrincipales = resp.data;
      })
      .catch((err) => []);
  };

  fnClaseDocumentoListar = (procedencia) => {
    this.comunService
      .obtenerClaseDocumento({
        procedencia: procedencia,
      })
      .then((resp) => {
        this.listaClaseDocumento = resp.data;
      })
      .catch((err) => []);
  };

  fnTupaRequisitosListar = () => {
    this.tupaRequisitoService.tupaRequisitoListar({
      IdTupa: this.idTupa
    })
      .then(resp => {
        this.listaTupaRequisito = resp.data;
      })
      .catch(err => []);
  }

  fnDependenciasListar = (coddep_principal, buscar) => {
    this.comunService
      .obtenerDependencias({
        coddep_principal: coddep_principal,
        buscar: buscar
      })
      .then((resp) => {
        this.listaDependencias = resp.data;
      })
      .catch((err) => []);
  };

  fnObtenerDependencia = (coddep) => {
    this.comunService
      .obtenerDependencia({
        coddep: coddep
      })
      .then((resp) => {
        this.dependenciaSeleccionada = resp.data;
      })
      .catch((err) => []);
  };

  fnObtenerDependenciaPorDefecto = () => {
    this.comunService
      .obtenerDependenciaPorDefecto()
      .then((resp) => {
        this.dependenciaSeleccionada = resp.data;
      })
      .catch((err) => []);
  };

  handleChangeOficina = ($buscar: string) => {
    var coddep_principal = this.coddep_principal;
    if($buscar.length > 3){
      this.fnDependenciasListar(coddep_principal,$buscar);
    }
  }
  
  handleAgregarArchivos = (value) => {
    if(value =="true"){
    this.isAgregarArchivos = true;
    }else{
      this.isAgregarArchivos = false;
    }
  }

  handleSeleccionarArchivos = () => {
   this.adjuntoPrincipal = document.getElementById('file_1');
   this.formSolicitud.uploader_filename = this.adjuntoPrincipal.files[0].name;
   this.isVisibleValidarAdjuntarArchivo =false;
   this.isVisibleValidarSubirArchivo =true;
  }

  subirArchivoPrincipal = () =>{
    const file = this.adjuntoPrincipal.files[0];
    if(file.size > (20*1048576)){
      this._alertService.open("warning",(`El archivo cargado supera el máximo permitido. Permitido.: ${20}MB`));
      return;
    } 
    this.spinner.show();
    this.solicitudService
    .subirArchivoPrincipal({file: file})
    .then((resp) => {
      this.spinner.hide();
     if(resp.success){
      this._alertService.open("success",(`El archivo se guardó correctamente`));
      this.adjuntoPrincipal = resp.data;
      this.isVisibleValidarSubirArchivo =false;
    }else{
      this._alertService.open("warning",resp.messages[0]);
    }
    })
    .catch((err) => []);

  }

  resetearArchivo = () =>{
    var input : any = document.getElementById('file_1');
    input.value = "";
    this.adjuntoPrincipal = null;
    this.formSolicitud.uploader_filename = null;
    this.isVisibleValidarSubirArchivo = false;
  }

  agregarAdjunto= () =>{ 
    var estado = true;
    var mensaje = '';
    if (this.descripcion_adjunto == null || this.descripcion_adjunto == '') {
        estado = false;
        mensaje = "Debe ingresar la descripción del adjunto.";
    } else {
        if (this.adjuntoSecundario == null) {
            estado = false;
            mensaje = "Debe ingresar archivo adjunto.";
        }
    }

    if (estado) {
        var obj = {
            nombre: this.descripcion_adjunto,
            archivo: this.adjuntoSecundario
        };
        this.reg_adjuntos.push(obj);
        this.descripcion_adjunto = null;
        this.resetearArchivoAdjunto();
    } else {
        this._alertService.open("warning",(mensaje));
    }
  }

  handleSeleccionarArchivosAdjuntos = () => {
    this.adjuntoSecundario = document.getElementById('file_2');
    this.uploader_adjunto_filename = this.adjuntoSecundario.files[0].name;
    this.isVisibleValidarSubirArchivoMas = true;
   }

  subirArchivoAdjunto = () =>{
    const file = this.adjuntoSecundario.files[0];
    if(file.size > (80*1048576)){
      this._alertService.open("warning",(`El archivo cargado supera el máximo permitido. Permitido.: ${80}MB`));
      return;
    } 
    this.spinner.show();
    this.solicitudService
    .subirArchivo({file: file})
    .then((resp) => {
      this.spinner.hide();
     if(resp.success){
      this._alertService.open("success",(`El archivo se guardó correctamente`));
      this.adjuntoSecundario = resp.data;
      this.isVisibleValidarSubirArchivoMas = false;
    }else{
      this._alertService.open("warning",resp.messages[0]);
    }
    })
    .catch((err) => []);
  }

  resetearArchivoAdjunto = () =>{
    var input : any = document.getElementById('file_2');
    input.value = "";
    this.adjuntoSecundario = null;
    this.uploader_adjunto_filename = null;
    this.isVisibleValidarSubirArchivoMas = false;
  }

  descargarAdjunto = (item) =>{
    if (item.archivo.id != '0') {
      var a = document.createElement('a');
      a.download = item.archivo.nombreOriginal;
      a.href = environment.apiUrl + '/solicitud/DescargarArchivo?id=' + item.archivo.id+ '&nombre=' + item.archivo.nombreOriginal;
      a.target = '_blank';
      document.body.append(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  eliminarAdjunto = (item) =>{
    this._alertService.confirm("warning",(`¿Desea eliminar el archivo adjunto? El adjunto se eliminará del trámite`),(`Eliminar adjunto`), () => {
      var index = this.reg_adjuntos.indexOf(item);
      this.reg_adjuntos.splice(index, 1);
      this.changeDetector.detectChanges();
    });
  }

  agregarRequisito = () => {
    var estado = true;
    var mensaje = '';
    // $("#errors_envio-tramite").html("").hide();
    if (this.tupaRequisito == null) {
        estado = false;
        mensaje = "Debe seleccionar el requisito.";
    }
    // if ($scope.es_requisito) {
      if (this.isTupa) {

        if (this.descripcion_archivo_tupa == null || this.descripcion_adjunto == '') {
            estado = false;
            mensaje = "Debe ingresar la descripción del documento.";
        } else {
            if (this.adjuntoRequisito == null) {
                estado = false;
                mensaje = "Debe ingresar archivo.";
            }
        }

        if (estado) {
            this.listaTupaRequisito.forEach(item =>  {
              if(item.idTupaRequisito.toString() == this.tupaRequisito){
                var obj = {
                  id_requisito: item.idTupaRequisito,
                  nombre_requisito: item.descripcion,
                  nombre_mostrar: this.descripcion_archivo_tupa,
                  nombre: this.descripcion_archivo_tupa,
                  archivo: this.adjuntoRequisito,
                  es_descarga: true,
                  codigo_pago: "0"
              };
              this.lista_requisitos.push(obj);
              this.descripcion_archivo_tupa = null;
              this.tupaRequisito = null;
              this.resetearArchivoRequisito();
              }
            });

        } else {
          this._alertService.open("warning",(mensaje));
        }
    } else {
        // if ($scope.PagoVoucher) {
        //     if ($scope.descripcion_archivo_tupa == null || $scope.descripcion_adjunto == '') {
        //         estado = false;
        //         mensaje = "Debe ingresar la descripción del documento.";
        //     } else {
        //         if ($scope.cod_archivo_requisito == null) {
        //             estado = false;
        //             mensaje = "Debe cargar el archivo y subir.";
        //         }
        //     }
        //     if (estado) {
        //         var obj_doc = {
        //             id_requisito: $scope.reg_requisito.id_requisito,
        //             nombre_requisito: $scope.reg_requisito.descripcion_requisito,
        //             nombre_mostrar: $sce.trustAsHtml("<span>" + $scope.descripcion_archivo_tupa + "</span>"),
        //             nombre: $scope.descripcion_archivo_tupa,
        //             archivo: $scope.cod_archivo_requisito,
        //             es_descarga: true,
        //             codigo_pago: "0"
        //         };
        //         $scope.lista_requisitos.push(obj_doc);
        //         $scope.descripcion_archivo_tupa = null;
        //         $scope.cod_archivo_requisito = null;
        //         $scope.limpiarFileRequisito();
        //         $scope.VerOrdenPago = false;
        //     } else {
        //         //bootbox.alert(mensaje);
        //         AlertService.Warning(mensaje);
        //     }
        // } else {
            // if ($scope.PagoOrdenPago) {
            //     if ($scope.monto_pagar == null) {
            //         estado = false;
            //         mensaje = "Debe ingresar un monto a pagar.";
            //     } else {
            //         if ($scope.referencia_requisito == null || $scope.referencia_requisito == "") {
            //             estado = false;
            //             mensaje = "Debe ingresar la referencia.";
            //         }
            //     }
            //     if (estado) {

            //         var mensaje_pago = "Monto a pagar: " + $scope.monto_pagar + " <br/>";
            //         mensaje_pago = mensaje_pago + "Moneda: " + $scope.moneda + " <br/>";
            //         mensaje_pago = mensaje_pago + "Referencia: " + $scope.referencia_requisito + " <br/>";
            //         var obj = {
            //             id_requisito: $scope.reg_requisito.id_requisito,
            //             nombre_requisito: $scope.reg_requisito.descripcion_requisito,
            //             nombre_mostrar: $sce.trustAsHtml(mensaje_pago),
            //             nombre: null,

            //             archivo: 0,
            //             codigo_pago: $scope.monto_pagar + ';' + $scope.moneda + ';' + $scope.referencia_requisito,
            //             es_descarga: false
            //         };
            //         $scope.lista_requisitos.push(obj);
            //         $scope.monto_pagar = null;
            //         $scope.referencia_requisito = null;
            //         $scope.VerPagoVoucher = false;

            //     } else {
            //         //bootbox.alert(mensaje);
            //         AlertService.Warning(mensaje);
            //     }
            // }
        // }
    }
  };

  validarRequisito = (item) => {
    this.descripcion_archivo_tupa = null;
    // $scope.cod_archivo_requisito = null;
    // this.resetearArchivoRequisito();

    // this.es_requisito = item == null ? true : !item.TieneControlPago;

    // if (!$scope.es_requisito) {

    //     $scope.moneda = item.moneda;
    // }
};

  handleSeleccionarArchivosRequisitos = () => {
    this.adjuntoRequisito = document.getElementById('file_3');
    this.uploader_requisito_filename = this.adjuntoRequisito.files[0].name;
    this.isVisibleValidarSubirArchivoRequisitoTupa = true;
  }

  subirArchivoRequisito = () =>{
    const file = this.adjuntoRequisito.files[0];
    if(file.size > (80*1048576)){
      this._alertService.open("warning",(`El archivo cargado supera el máximo permitido. Permitido.: ${80}MB`));
      return;
    } 
    this.spinner.show();
    this.solicitudService
    .subirArchivo({file: file})
    .then((resp) => {
      this.spinner.hide();
     if(resp.success){
      this._alertService.open("success",(`El archivo se guardó correctamente`));
      this.adjuntoRequisito = resp.data;
      this.isVisibleValidarSubirArchivoRequisitoTupa = false;
    }else{
      this._alertService.open("warning",resp.messages[0]);
    }
    })
    .catch((err) => []);
  }

  eliminarRequisito = (item) =>{
    this._alertService.confirm("warning",(`¿Desea eliminar el archivo adjunto? El adjunto se eliminará del trámite`),(`Eliminar adjunto`), () => {
      var index = this.lista_requisitos.indexOf(item);
      this.lista_requisitos.splice(index, 1);
      this.changeDetector.detectChanges();
    });
  }

  resetearArchivoRequisito = () =>{
    var input : any = document.getElementById('file_3');
    input.value = "";
    this.adjuntoRequisito = null;
    this.uploader_requisito_filename = '';
    this.isVisibleValidarSubirArchivoRequisitoTupa = false;
  }

  detalleOficina(event){
    this.listaDependencias.forEach(item =>  {
      if(item.dependenciaFull == this.buscar){
        this.dependenciaSeleccionada = item;
        if(this.buscar == "DIRECCIÓN GENERAL DE ACUICULTURA-DGA"){
          this.isVisibleVua = true;
          this.CodDependencia = this.dependenciaSeleccionada.cod_dependencia
          this.handleListarServicioTramite();
        }else{
          this.isVisibleVua = false;
        }
      }
    });   
  }

  handleClickEditar = (item) =>{
    this.formSolicitud.asunto = item.descripcion_servicio;
    this.formSolicitud.clase = "133";
    this.fnPaso2()
  }

  handleListarServicioTramite = () =>{
    this.page = 1;
    this.pageSize = 10;
    let filter ={
      codigo_dependencia: this.CodDependencia,
      Page: this.page,
      PageSize: this.pageSize,
    }
    this.tupaService.Servicio_tramite_list_by_dependencia(filter)
      .then(resp => {
        this.listaServicioTramite = resp.data;
      })
      .catch(err => []);
  }

  fnPaso2 = () => {
    var coddep_principal = this.coddep_principal;
    var dependencia = this.dependenciaSeleccionada;
    if (coddep_principal == 0 || dependencia==undefined) {
      this._alertService.open(
          "warning",
          "Complete y verifique todos los campos obligatorios"
      );
      return false;
    } else{
      if (!this.isAuth) { 
        if (localStorage.getItem('redirect')) {
          localStorage.removeItem('redirect');
        }
        var urlCodDep = "/tramite-linea?CodDep="+this.dependenciaSeleccionada.cod_dependencia;
        localStorage.setItem('redirect', JSON.stringify(urlCodDep));
        let config: MatDialogConfig = {
          panelClass: "dialog-responsive",
          width: "30%",
          data: {},
          disableClose: true,
        }
        const dialogRef = this.dialog.open(ModalIniciarSesionTramiteComponent, config);
        dialogRef.afterClosed().subscribe(result => {
          if (JSON.parse(result)) {
            console.log("Cerrado")
          }
        });
      }else{
        this.isPaso1 = false;
        this.isPaso2 = true;
        this.isPaso3 = false;
      }
      }
  }

  fnPaso2Alterno = ($event) => {

    if (!this.isAuth) {
      if (localStorage.getItem('redirect')) {
        localStorage.removeItem('redirect');
      }

      this.comunService
      .obtenerDependenciaPorDefecto()
      .then((resp) => {
        this.dependenciaSeleccionada = resp.data;
        var codDep = this.dependenciaSeleccionada.cod_dependencia;
        var urlTupa = "/tramite-linea?CodDep="+codDep;
        localStorage.setItem('redirect', JSON.stringify(urlTupa));
        let config: MatDialogConfig = {
          panelClass: "dialog-responsive",
          width: "30%",
          data: {},
          disableClose: true,
        }
        const dialogRef = this.dialog.open(ModalIniciarSesionTramiteComponent, config);
        dialogRef.afterClosed().subscribe(result => {
          if (JSON.parse(result)) {
            console.log("Cerrado")
          }
        });
      })
      .catch((err) => []);
    }
    else{
      this.comunService
      .obtenerDependenciaPorDefecto()
      .then((resp) => {
        this.dependenciaSeleccionada = resp.data;
        var dependencia = this.dependenciaSeleccionada;
        if (dependencia==undefined) {
          this._alertService.open(
              "warning",
              "Complete y verifique todos los campos obligatorios"
          );
  
          return false;
        } else{
            this.isPaso1 = false;
            this.isPaso2 = true;
            this.isPaso3 = false;
          }
      })
      .catch((err) => []);
    }
  }

  fnPaso3 = ($event) => {
    var isAcceptTerms = this.isAcceptTerms;
    if (!isAcceptTerms) {
      this._alertService.open(
          "warning",
          "Debe aceptar los términos y condiciones."
      );

      return false;
    } else{
      if(this.isTupa){
        this.fnTupaRequisitosListar();
      }else{
        this.fnClaseDocumentoListar(this.enumerado.CLASE_DOCUMENTO.EXTERNO);
      }
    this.isPaso1 = false;
    this.isPaso2 = false;
    this.isPaso3 = true;
  }
  }

  fnRegistrarTramite = ($event) => {
    var estado = true;
    var mensaje = '';
    var element= document.querySelector('input[name="RadioGroup"]:checked');
    var tieneAdjuntos = element.attributes.getNamedItem('value').value;

    if (this.formSolicitud.asunto == null || this.formSolicitud.asunto == '') {
        estado = false;
        mensaje = "Debe ingresar el asunto del trámite.";
    }
    else if(this.formSolicitud.indicativo == null || this.formSolicitud.indicativo == ''){
      estado = false;
      mensaje = "Debe ingresar el número de solicitud o documento principal.";
    }
    else if(this.formSolicitud.clase == "0" || this.formSolicitud.indicativo == ''){
      estado = false;
      mensaje = "Debe seleccionar un tipo de documento.";
    }
    else if(this.isVisibleValidarAdjuntarArchivo){
      estado = false;
      mensaje = "Debe agregar un archivo principal.";
    }
    else if( this.isVisibleValidarSubirArchivo){
      estado = false;
      mensaje = "Debe subir archivo adjunto.";
    }
    else if(this.formSolicitud.clase == null || this.formSolicitud.clase == ''){
      estado = false;
      mensaje = "Debe ingresar el tipo de documento del trámite.";
    }else{
      if (this.adjuntoPrincipal == null) {
        estado = false;
        mensaje = "Debe ingresar archivo adjunto del trámite.";
      }else if(tieneAdjuntos == "true"){
        if(this.reg_adjuntos.length == 0){
          estado = false;
          mensaje = "Debe agregar un archivo adjunto como mínimo. En caso no desee hacerlo, por favor seleccionar la opción No.";
        }
      }
    }
    if (estado) {
        this._alertService.confirm("warning",(`¿Desea enviar el presente trámite para su evaluación? Esta acción no se puede revertir.`),(`Enviar Trámite`), () => {
          this.spinner.show();
          this.solicitudService.solicitudEnviar({
            asunto: this.formSolicitud.asunto,
            indicativo: this.formSolicitud.indicativo,
            referencia: this.formSolicitud.referencia,
            archivoadjuntos: this.reg_adjuntos,
            id_clase_documento: Number(this.formSolicitud.clase),
            cod_dependencia: this.dependenciaSeleccionada.cod_dependencia,
            coddep_origen: this.enumerado.COD_DEP.OGACI,
            cod_gestorarchivo: this.adjuntoPrincipal.id
          }).then(resp => {
            if (resp) {
              this.spinner.hide();
              this._alertService.open("success",resp.mensaje,
                "Registro exitoso",
                () => {
                    this.router.navigateByUrl('/principal');
                }
              );
            }
            else {
              this._alertService.open("warning",("Ha ocurrido un error"));
            }
          })
            .catch(err => {
              this._alertService.open("warning",("Ha ocurrido un error"));
            });
        });
    } else {
        this._alertService.open("warning",(mensaje));
    }
  }

  fnRegistrarTramiteTupa = ($event) => {
    var estado = true;
    var mensaje = '';

    if (this.lista_requisitos.length == 0) {
      estado = false;
      mensaje = "Debe adjuntar al menos un archivo que corresponda a un requisito..";
    }
    
    if (estado) {
        this._alertService.confirm("warning",(`¿Desea enviar el presente trámite para su evaluación? Esta acción no se puede revertir.`),(`Enviar Trámite`), () => {
          this.spinner.show();
          this.solicitudService.solicitudTupaEnviar({
            // asunto: this.formSolicitud.asunto,
            // indicativo: this.formSolicitud.indicativo,
            archivoadjuntos: this.lista_requisitos,
            // id_clase_documento: Number(this.formSolicitud.clase),
            cod_dependencia: this.formTupa.codigoDependencia,
            id_tupa: this.formTupa.idTupa,
            coddep_origen: this.enumerado.COD_DEP.OGACI,
            // cod_gestorarchivo: this.adjuntoPrincipal.id
          }).then(resp => {
            this.spinner.hide();
            if (resp) {
              this._alertService.open("success",resp.mensaje,
                "Registro exitoso",
                () => {
                    this.router.navigateByUrl('/principal');
                }
              );
            }
            else {
              this._alertService.open("warning",("Ha ocurrido un error"));
            }
          })
            .catch(err => {
              this._alertService.open("warning",("Ha ocurrido un error"));
            });
        });
    } else {
        this._alertService.open("warning",(mensaje));
    }
  }

}
