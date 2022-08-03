import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ComunService } from 'src/app/services/comun.service';
import { tupaModel } from 'src/app/interfaces/models/tupaModel';
import { usuarioModel } from 'src/app/interfaces/models/usuarioModel';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { environment } from 'src/environments/environment';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ChangeDetectorRef } from '@angular/core';
import { DocumentoAdjuntoService } from 'src/app/services/documentoAdjunto.service';

@Component({
  selector: 'app-formulario-adjuntar-observacion',
  templateUrl: './formulario-adjuntar-observacion.component.html'
})
export class FormularioAdjuntarObservacionComponent implements OnInit {
  usuario = new usuarioModel();
  formTupa = new tupaModel();
  dependenciaSeleccionada: string;
  numTramDocumentario: string;
  reg_adjuntos : Array<any> =[];
  uploader_adjunto_filename: string;
  adjuntoSecundario : any;
  isVisibleValidarSubirArchivoMas: boolean = false;
  isDisableAgregarAdjunto: boolean = true;
  descripcion_adjunto: string;
  asunto: string; 
  idDocumento: number;
  codDep: number;
  constructor(
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comunService: ComunService,
    private _alertService: AlertService,
    private solicitudService: SolicitudService,
    private documentoAdjuntoService: DocumentoAdjuntoService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog) 
    { 
      this.dependenciaSeleccionada = data.dependenciaSeleccionada;
      this.numTramDocumentario  = data.numTramDocumentario;
      this.idDocumento = data.idDocumento;
      this.codDep = data.codDep;
    }

  ngOnInit(): void {
    this.obtenerDatosUsuario();
  }
  obtenerDatosUsuario = () =>{
    this.comunService.obtenerDatosUsuario()
    .then(resp => {
      this.usuario.RazonSocial = resp.data.razonSocial;
      this.usuario.IdPersona = resp.data.idTipoPersona;
      this.usuario.NombreCompleto = resp.data.nombreCompleto;
      this.usuario.NumeroDocumento = resp.data.nroDocumento;
    })
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
      this.isDisableAgregarAdjunto = false;
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
        this.isDisableAgregarAdjunto = true;
    } else {
        this._alertService.open("warning",(mensaje));
    }
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
   
  EnviarTramite = () =>{
    var tiene_mensaje = 0;
    var mensajes = "";
    if(this.asunto == undefined || this.asunto == "")
    {
      mensajes += "<li>Debe ingresar el asunto.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }
    if(this.reg_adjuntos.length == 0){
      mensajes += "<li>Debe ingresar al menos un documento.</li>";
      tiene_mensaje = tiene_mensaje + 1;
    }

    if(tiene_mensaje > 0)
    {
      this._alertService.alertWarning("<ul style='list-style:none !important; padding:0px !important; font-size: 13px !important;'>"+mensajes+"</ul>","");
      return
    }

    var obj = {
      id_solicitud: 0,          
      asunto: this.asunto,        
      archivos: this.reg_adjuntos,
      cod_dependencia: this.codDep,
      coddep_origen: this.codDep,
      id_documento: this.idDocumento
    };
    this.spinner.show();
    this.documentoAdjuntoService.RegistrarDocumentoAdjunto(obj)
    .then(resp => {
     this.spinner.hide();
     if(resp.success){
        this._alertService.alertOk("Su trámite ha sido enviado correctamente.","",
        () => {
          this.dialog.closeAll();
      });
     }
     else{
      this._alertService.alertError("El documento no ha sido generado correctamente, por favor intentarlo nuevamente.","");
     }
    })
  }
}
