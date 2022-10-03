import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultWargErrMessage: string =
    'Ocurrió un problema para procesar su solicitud, inténtelo nuevamente';

  constructor(private toastrService: ToastrService) {}

  default(message?: string, title?: string, type: string = 'default') {
    this.show(message ?? '', title ?? '', type);
  }

  info(message?: string, title?: string, type: string = 'info') {
    this.show(message ?? '', title ?? 'Información', type);
  }

  success(message?: string, title?: string, type: string = 'success') {
    this.show(message ?? '', title ?? 'Éxito', type);
  }

  warning(message?: string, title?: string, type: string = 'warning') {
    this.show(
      message ?? this.defaultWargErrMessage,
      title ?? 'Importante',
      type
    );
  }

  danger(message?: string, title?: string, type: string = 'error') {
    this.show(message ?? this.defaultWargErrMessage, title ?? 'Atención', type);
  }

  private show(
    message: string,
    titlle: string,
    type: string = 'default',
    position: string = 'top-right'
  ) {
    this.toastrService.show(message, titlle, {
      timeOut: 8000,
      tapToDismiss: false,
      closeButton: true,
      enableHtml: true,
      positionClass: `toast-${position}`,
      //toastClass: `ngx-toastr alert alert-dismissible alert-${type} alert-notify`,
      toastClass: `ngx-toastr alter alert-dismissible toast-${type} alert-notify`,
    });
  }
}
