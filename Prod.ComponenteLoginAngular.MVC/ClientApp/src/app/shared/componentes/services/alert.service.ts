import { Injectable } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { AlertComponent } from "../alert/alert.component";
import { modalDefaultConfig } from "../../modal/modal-default-config";
import Swal from 'sweetalert2';
// import { ComponentDef } from "@angular/core/src/render3";

@Injectable({
    providedIn: "root",
})
export class AlertService {
    constructor(private _modalService: BsModalService) {}
    /*
    type: success, error, warning, info
    */
    open = (
        type: string,
        msg: string,
        title: string = null,
        onOk: Function = undefined,
        componentDef?: Function
    ) => {
        const state = {
            type,
            msg,
            title,
            onOk,
            componentDef,
        };
        const config = {
            ...modalDefaultConfig,
            class: "modal-custom",
            initialState: state,
        };
        this._modalService.show(AlertComponent, config);
    };

    confirm = (
        type: string,
        msg: string,
        title: string = null,
        onConfirm: Function = undefined
    ) => {
        const state = {
            type,
            msg,
            title,
            onOk: onConfirm,
            cancelButton: true,
        };
        const config = {
            ...modalDefaultConfig,
            class: "modal-custom",
            initialState: state,
        };
        this._modalService.show(AlertComponent, config);
    };


    alertOk(title: string = 'PROCESO EXITOSO', text: string = 'Registro Guardado', callBack?: any) {
        Swal.fire({
          title: title,
          type: 'success',
          html: text,
          allowOutsideClick: false,
          allowEscapeKey: false
          //footer: '<a href>Why do I have this issue?</a>'
        }).then(resultado => {
          if (callBack)
            callBack();
        });
      }
    
      alertConfirm(title: string = '¿Está seguro?', text: string = '', callBackOk?: any, callBackError?: any) {
        Swal.fire({
          title: title,
          html: text,
          type: 'question',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          cancelButtonColor: '#b5b3b3',
          cancelButtonText: 'No',
          confirmButtonText: 'Si',
          reverseButtons: false
        }).then((resultado) => {
          if (resultado.value) {
            if (callBackOk)
              callBackOk();
          }
          else
            if (callBackError)
              callBackError();
        });
      }
    
      alertError(text: string, callBack?: any): boolean {
        Swal.fire({
          title: 'Error',
          html: text,
          type: 'error',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Ok',
        }).then((value) => {
          if (callBack)
            callBack();
        });
        return false;
      }
    
      alertWarning(text: string, callBack?: any): boolean {
        Swal.fire({
          title: 'Alerta',
          html: text,
          type: 'warning',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Ok',
        }).then((value) => {
          if (callBack)
            callBack();
        });
        return false;
      }

    //Modalidad de envio
    // modalidadEnvio = (
    //     type: string,
    //     msg: string,
    //     title: string = null,
    //     onOk: Function = undefined,
    //     tieneDomicilio: Boolean
    // ) => {
    //     const state = {
    //         type,
    //         msg,
    //         title,
    //         onOk,
    //         tieneDomicilio
    //     };
    //     const config = {
    //         ...modalDefaultConfig,
    //         class: "modal-custom",
    //         initialState: state
    //     };
    //     this._modalService.show(AlertModadlidadEnvioComponent, config);
    // };
}
